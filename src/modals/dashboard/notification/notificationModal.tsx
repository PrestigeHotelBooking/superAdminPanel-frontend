import PrButton from '@/components/common/PrButton/PrButton';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import PrInputField from '@/components/common/PrInputField/PrInputField';
import PrTextArea from '@/components/common/PrTextArea/PrTextArea';

function NotificationModal() {
  return (
    <div className='p-8 w-[50%]'>
      <div className='font-semibold text-[24px]'> Create Notification</div>
      <PrInputField label={'Title'} className='w-full'></PrInputField>
      <PrTextArea label={'Content'}></PrTextArea>
      <PrButtonV2 label={'Sent'} buttonStyle='danger' className='rounded-md'></PrButtonV2>
    </div>
  );
}
export default NotificationModal;
