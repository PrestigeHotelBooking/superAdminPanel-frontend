import PrButtonV2 from '@/components/common/PrButton/PrButtonV2'
import PrTextArea from '@/components/common/PrTextArea/PrTextArea'
import { ENDPOINTS } from '@/components/lang/EndPoints'
import { BackendPatch } from '@/components/services/BackendServices'
import usePropertySingle from '@/hooks/useProperty/usePropertySingle'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface policyModalT {
  generalPolicy: string
  cancellationPolicy: string
  paymentPolicy: string
}

const initialPolicyModal: policyModalT = {
  generalPolicy: '',
  cancellationPolicy: '',
  paymentPolicy: '',
}

function PolicyModal({ id }: { id: string }) {
  const { data } = usePropertySingle(id)

  useEffect(() => {
    handleState({
      generalPolicy: data?.property_policy,
      cancellationPolicy: data?.property_cancellation_policy,
      paymentPolicy: data?.property_payment_policy,
    })
  }, [data])

  const [policyModalData, setPolicyModalData] = useState<policyModalT>(initialPolicyModal)

  const handleState = (data: Partial<policyModalT>) => {
    setPolicyModalData((prevState) => ({
      ...prevState,
      ...data,
    }))
  }

  const updatePolicyModal = async () => {
    const data = {
      updateData: [
        {
          property_policy: policyModalData?.generalPolicy,
          property_cancellation_policy: policyModalData?.cancellationPolicy,
          property_payment_policy: policyModalData?.paymentPolicy,
        },
      ],
    }
    const updateData = await BackendPatch(`${ENDPOINTS.PROPERTY.UPDATE}/${id}`, data)
    if (updateData?.success) {
      toast.success(`updated the policy data`)
    } else {
      toast.error(`unable to update the policy data`)
    }
  }

  return (
    <div className='mb-64'>
      <PrTextArea
        label={'General Policy'}
        value={policyModalData.generalPolicy}
        onChange={(e) => {
          handleState({ generalPolicy: e.target.value })
        }}
      ></PrTextArea>
      <PrTextArea
        label={`Cancellation Policy`}
        onChange={(e) => {
          handleState({ cancellationPolicy: e.target.value })
        }}
        value={policyModalData.cancellationPolicy}
      ></PrTextArea>
      <PrTextArea
        label={`Payment Policy`}
        onChange={(e) => {
          handleState({ paymentPolicy: e.target.value })
        }}
        value={policyModalData.paymentPolicy}
      ></PrTextArea>
      <div className='w-1/4 mx-auto flex justify-between'>
        <PrButtonV2 label={'Save'} className='w-40 rounded-md' onClick={updatePolicyModal}></PrButtonV2>
        <PrButtonV2 label={'Cancel'} dangerLink buttonStyle='danger' className='w-40 rounded-md'></PrButtonV2>
      </div>
    </div>
  )
}
export default PolicyModal
