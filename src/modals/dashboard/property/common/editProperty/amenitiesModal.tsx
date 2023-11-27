import React, { useEffect, useState } from 'react';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import PrCheckbox from '@/components/common/PrCheckBox/PrCheckbox';
import { BackendPatch, BackendPost } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';
import { toast } from 'react-toastify';
import useConfigurationData from '@/hooks/useConfigurationData/useConfigurationData';
import PrCircularProgressIndicator from '@/components/common/Loader/PrCircularProgressIndicator';
import useRoomData from '@/hooks/useRoomData/useRoomData';
import _ from 'lodash';

type amenitiesValueT = {
  check: boolean;
  value: string;
};
type CheckedValues = Record<string, amenitiesValueT>;

function AmenitiesModal({ id }: { id: string }) {
  const { data: roomData } = useRoomData(id);
  const [checkedValuesByRoomId, setCheckedValuesByRoomId] = useState<Record<string, CheckedValues>>({});
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const { loading, amenities } = useConfigurationData();

  const columnCount = 3;
  const chunkSize = Math.ceil(amenities.length / columnCount);
  const amenitiesChunks: any = [];

  for (let i = 0; i < amenities.length; i += chunkSize) {
    const chunk = amenities.slice(i, i + chunkSize);
    amenitiesChunks.push(chunk);
  }

  const handleChange = (label: string, isChecked: amenitiesValueT, checkId: string) => {
    setCheckedValuesByRoomId((prevValues) => ({
      ...prevValues,
      [checkId]: {
        ...prevValues[checkId],
        [label]: isChecked,
      },
    }));
  };

  useEffect(() => {
    if (roomData?.length) {
      _.forEach(roomData, (e) => {
        _.forEach(JSON.parse(e?.room_amenities), (d) => {
          handleChange(d, { check: true, value: d }, e?.room_id?.toString());
        });
      });
    }
  }, [roomData]);

  const handleSaveClick = async () => {
    const update = _.map(checkedValuesByRoomId, (values, id) => ({
      room_id: id,
      room_amenities: _.chain(values).pickBy('check').map('value').value(),
    }));

    const data = await BackendPost(`${ENDPOINTS.ROOM.UPDATE_AMENITIES}`, { update });

    if (data.success) {
      toast.success('Update the amenities Successfully');
    } else {
      toast.error(`Unable to update the amenity`);
    }
  };

  const AmenitiesCheckBoxModal = (room_id: string) => {
    return (
      <div className='grid grid-cols-3 w-full ml-4'>
        {amenitiesChunks?.map((chunk: any, chunkIndex: any) => (
          <div key={chunkIndex}>
            {chunk?.map((amenity: any, index: number) => (
              <PrCheckbox
                key={index}
                id={index.toString()}
                label={amenity?.label}
                onClick={(value: boolean) =>
                  handleChange(
                    amenity?.value,
                    {
                      check: value,
                      value: amenity.value,
                    },
                    room_id,
                  )
                }
                value={checkedValuesByRoomId[room_id]?.[amenity?.value]?.check || false}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return loading ? (
    <PrCircularProgressIndicator></PrCircularProgressIndicator>
  ) : (
    <div className='mb-64'>
      <div className='flex flex-row space-y-4 w-full h-full '>
        <div className='w-2/12 h-max-100  border-r border-gray-200 p-2 mr-4 '>
          {roomData?.map((d) => (
            <div
              key={d?.room_id}
              className={` cursor-pointer hover:bg-blue-400 hover:text-white  hover:rounded-md  text-lg text-gray-500 p-2 mr-2 mb-2 ml-4  ${
                d?.room_id.toString() === selectedRoomId && 'bg-blue-700 rounded-md text-white  '
              }  `}
              onClick={() => setSelectedRoomId(d?.room_id.toString())}
            >
              {d?.room_Name}
            </div>
          ))}
        </div>
        {AmenitiesCheckBoxModal(selectedRoomId)}
      </div>

      <div className='flex mt-12 space-x-16 justify-center'>
        <PrButtonV2 label={'Save'} className='rounded-md' onClick={handleSaveClick} />
        <PrButtonV2 label={'Cancel'} className='rounded-md' dangerLink buttonStyle='danger' />
      </div>
    </div>
  );
}

export default AmenitiesModal;
