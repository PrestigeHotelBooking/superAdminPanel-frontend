import React, { useMemo, useState } from "react";
import PRInputField from "@/components/common/PrInputField/PrInputField";
import PrInputFieldV2 from "@/components/common/PrInputField/PrInputFieldV2";
import PrIcon from "@/components/common/PrIcon/PrIcon";
import { PrCountryInputField } from "@/components/common/PrCountryInputField/PrCountryInputField";
import PrMapComponent from "@/components/common/PrMapComponent/PrMapComponent";
import AddPropertySuccessFully from "@/components/common/Card/PropertyCard/AddPropertySuccessFully";
import { ENDPOINTS } from "@/components/lang/EndPoints";
import { BackendPost } from "@/components/services/BackendServices";
import PrButtonV2 from "@/components/common/PrButton/PrButtonV2";
import { findFirstEmptyField } from "@/components/helper/validator";
import { getCurrentDate } from "@/components/common/DateFormat/dateHelper";

interface AddPropertyProps {
  closeModal: () => void;
}

interface AddPropertyT {
  propertyName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  latitude: number;
  longitude: number;
  totalNoOfRooms: number;
  username: string;
  password: string;
  confirmPassword: string;
}

// Define an initial object with default values
const initialAddProperty: AddPropertyT = {
  propertyName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  latitude: 0,
  longitude: 0,
  totalNoOfRooms: 0,
  username: "",
  password: "",
  confirmPassword: "",
};

const AddProperty = (props: AddPropertyProps) => {

  const [modal, setModal] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [addPropertyData, SetAddPropertyData] =
    useState<AddPropertyT>(initialAddProperty);

    const handleState = (data: Partial<AddPropertyT>) => {
      SetAddPropertyData((prevData) => ({
        ...prevData,
        ...data, 
      }));
    };
    



  const ModalChangeSucess = () => {
    setSuccessModal(!successModal);
  };

  const handleAddproperty = async () => {
    setButtonLoading(true);
    setErrorMsg("");
    const isEmpty = findFirstEmptyField(addPropertyData);
    if (!isEmpty) {
      try {
        const data={
          property_name:addPropertyData.propertyName,
          property_city:addPropertyData.city,
          property_state:addPropertyData.state,
          property_country:addPropertyData.country,
          property_pincode:addPropertyData.pincode,
          property_addressLine1:addPropertyData.addressLine1,
          property_addressLine2:addPropertyData.addressLine2,
          property_totalNoOfRooms:addPropertyData.totalNoOfRooms,
          property_latitude:addPropertyData.latitude,
          property_longitude:addPropertyData.longitude,
          propertyuser_username:addPropertyData.username,
          propertyuser_password:addPropertyData.password,
          created_at:getCurrentDate('YYYY-MM-DD')
        }
        const responseData = await BackendPost(ENDPOINTS.PROPERTY.ADD,data);
        setButtonLoading(!buttonLoading);
        if(responseData.success){
          setModal(false);
          setSuccessModal(true);
        }
        else{
          setButtonLoading(false);
          setErrorMsg(`Server Error. Unable to add`);
        }
      } catch (error) {
        console.error("Error adding property:", error);
        setButtonLoading(!buttonLoading);
      }
    } else {
      setButtonLoading(false);
      setErrorMsg(`* ${isEmpty} field is required.`);
    }
  };

  
  const mapProps = useMemo(() => {
    return {
      initialLatitude: addPropertyData?.latitude|| 0, // Use a default value if data is not available
      initialLongitude: addPropertyData?.longitude || 0, // Use a default value if data is not available
      className: 'w-full h-full',
      onMapDrag: (lat:any,long:any) => {
        handleState({
          latitude:lat,
          longitude:long
                  })
       },
    };
  }, [addPropertyData?.latitude,addPropertyData?.longitude]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ">
      {modal && (
        <div className="bg-white p-6 rounded-lg shadow-lg ">
          <div className="flex items-center justify-between border-b border-black mb-4">
            <h2 className="text-xl font-semibold mb-4">Add Property</h2>
            <PrIcon
              onClick={props.closeModal}
              className="hover:cursor-pointer"
              name={"X"}
            ></PrIcon>
          </div>

          <form className="flex">
            <div>
              <PRInputField
                label="Property Name"
                value={addPropertyData.propertyName}
                placeholder="Enter property name"
                onChange={(e: any) =>
                  handleState({ propertyName: e.target.value })
                }
              />
              <div className="text-bg-[#061D30] font-bold text-[1rem] mb-4">
                Property Address
              </div>
              <PrInputFieldV2
                label={"Address Line 1"}
                value={addPropertyData.addressLine1}
                onChange={(e: any) =>
                  handleState({ addressLine1: e.target.value })
                }
              ></PrInputFieldV2>
              <PrInputFieldV2
                label={"Address Line 2"}
                value={addPropertyData.addressLine2}
                onChange={(e: any) =>
                  handleState({ addressLine2: e.target.value })
                }
              ></PrInputFieldV2>
              <PrInputFieldV2
                label={"City/Town"}
                value={addPropertyData.city}
                onChange={(e: any) => handleState({ city: e.target.value })}
              ></PrInputFieldV2>
              <PrInputFieldV2
                label={"State/Province/Region"}
                value={addPropertyData.state}
                onChange={(e: any) => handleState({ state: e.target.value })}
              ></PrInputFieldV2>
            </div>
            <div className="ml-12">
              <PrInputFieldV2
                label={"Pin/Zip/Postal Code"}
                value={addPropertyData.pincode}
                onChange={(e: any) => handleState({ pincode: e.target.value })}
              ></PrInputFieldV2>
              <PrCountryInputField
                value={addPropertyData.country}
                onChange={(value: any) => handleState({ country: value})}
              />
              <label className="block font-semibold mt-4">GPS Location</label>
              <div className="w-[10] h-[10]">
                <PrMapComponent {...mapProps} />
              </div>
              <PRInputField
                label="Total No Of Rooms"
                value={addPropertyData.totalNoOfRooms}
                onChange={(e: any) =>
                  handleState({ totalNoOfRooms: e.target.value })
                }
                placeholder="Enter number of rooms"
              />
            </div>
            <div className="ml-12">
              <PRInputField
                label="Username"
                value={addPropertyData.username}
                onChange={(e: any) => handleState({ username: e.target.value })}
                placeholder="The Country Resort I"
              />
              <PRInputField
                label="Create Password"
                value={addPropertyData.password}
                onChange={(e: any) => handleState({ password: e.target.value })}
                placeholder="000000000000"
              />
              <PRInputField
                label="Confirm Password"
                value={addPropertyData.confirmPassword}
                onChange={(e: any) => handleState({ confirmPassword: e.target.value })}
                placeholder="000000000000"
              />
            </div>
          </form>
          <div className="flex justify-center mt-25">
            <PrButtonV2
              label={"Create"}
              loading={buttonLoading}
              buttonStyle="danger"
              className="rounded-md"
              onClick={handleAddproperty}
            ></PrButtonV2>
          </div>
          <div className="text-red-500 font-bold text-center mt-8">
            {errorMsg ? errorMsg : null}
          </div>
        </div>
      )}
      {successModal && (
        <AddPropertySuccessFully
          closeModal={ModalChangeSucess}
        ></AddPropertySuccessFully>
      )}
    </div>
  );
};

export default AddProperty;
