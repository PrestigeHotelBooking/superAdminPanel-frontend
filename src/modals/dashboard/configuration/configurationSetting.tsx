import { H1 } from '@/components/common/Header/header';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import PrIconV2 from '@/components/common/PrIcon/PrIconV2';
import PrInputField from '@/components/common/PrInputField/PrInputField';

function ConfigurationSetting() {
  return (
    <div className='flex'>
      <div className='flex-1 p-8 '>
        <div className='p-8 w-full h-[15rem] rounded-md bg-white'>
          <H1 className='flex space-x-2'>
            <PrIconV2 name={'CurrencyExchangeSharp'} size='medium'></PrIconV2>
            <div className='ml-6'> Convenience Charge</div>
          </H1>
          <PrInputField label={''} className='p-2 w-full'></PrInputField>
          <div className='flex mt-8 space-x-16 justify-center'>
            <PrButtonV2 label={'Save'} className='rounded-md' />
            <PrButtonV2 label={'Cancel'} className='rounded-md' dangerLink buttonStyle='danger' />
          </div>
        </div>
      </div>
      <div className='flex-1 p-8'>
        <div className='p-8 w-full h-[15rem] rounded-md bg-white'>
          <H1 className='flex space-x-2'>
            <PrIconV2 name={'LocalOfferSharp'} size='medium'></PrIconV2>
            <div className='ml-6'> Membership Discount</div>
          </H1>
          <PrInputField label={''} className='p-2 w-full'></PrInputField>
          <div className='flex mt-8 space-x-16 justify-center'>
            <PrButtonV2 label={'Save'} className='rounded-md' />
            <PrButtonV2 label={'Cancel'} className='rounded-md' dangerLink buttonStyle='danger' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationSetting;
