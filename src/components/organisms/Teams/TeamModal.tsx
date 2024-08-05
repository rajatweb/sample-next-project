import UiButton from '@/components/UiComponents/Button/UiButton';
import FormLabelInput from '@/components/UiComponents/Form/FormLabelInput';
import FormWrapper from '@/components/UiComponents/Form/FormWrapper';
import Modal from '@/components/UiComponents/Modal';
import ModalActions from '@/components/UiComponents/Modal/ModalActions';
import ModalBody from '@/components/UiComponents/Modal/ModalBody';
import ModalTitle from '@/components/UiComponents/Modal/ModalTitle';
import { useCreateTeamMutation,useUpdateTeamMutation } from '@/lib/api/coreApi';
import { useAppSelector, useActions } from '@/lib/hooks';
import { ITeamFormProps, ITeamUserFormProps } from '@/utils/commonTypes';
import React from 'react'
import { useForm } from 'react-hook-form';

const TeamModal = () => {
    const isOpen = useAppSelector(state => state.teamModal.isOpen);
    const modalType = useAppSelector(state => state.teamModal.modalType);
    const formState = useAppSelector(state => state.teamModal.initialValues);
  
    const [addTeam, { isLoading: createLoading }] = useCreateTeamMutation();
    const [updateTeam, { isLoading: updateLoading }] = useUpdateTeamMutation();
  
    const { closeTeamModal, toggleSuccessSnackbar, toggleErrorSnackbar } = useActions();
  
    const methods = useForm<ITeamUserFormProps>({ defaultValues: formState });
    const { handleSubmit } = methods;
  
  
    const handleClose = () => {
      closeTeamModal();
    }
  
    const onSubmit = (props: ITeamFormProps) => {
  
      const modalMap = {
        create: {
          fn: addTeam,
          successMessage: 'Team Created Successfully',
          errorMessage: 'Team Creation Failed'
        },
        edit: {
          fn: updateTeam,
          successMessage: 'Team Updated Successfully',
          errorMessage: 'Team Update Failed'
        }
      }
  
      modalMap[modalType].fn(props).unwrap().then(() => {
        handleClose();
        toggleSuccessSnackbar({ message: modalMap[modalType].successMessage })
      }).catch(() => {
        toggleErrorSnackbar({ message: modalMap[modalType].errorMessage })
      })
    }
  
    return (
      <Modal
        open={isOpen}
        maxWidth='md'
        fullWidth
        onClose={handleClose}
        disableEscapeKeyDown={true}
      >
        <FormWrapper
          methods={methods}
          id="team-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModalTitle onClose={handleClose}>{'Add New Team'}</ModalTitle>
         <ModalBody>
            <div className="flex gap-2 w-full">
              <FormLabelInput
                disabled={createLoading || updateLoading}
                className='flex-1'
                fullWidth name='name'
                placeholder='Team Name'
                label="Team Name"
                rules={{ required: 'Please provide team name' }}
              />
            </div>
          </ModalBody>
          <ModalActions>
            <UiButton onClick={() => handleClose()} label='Cancel' />
            <UiButton type='submit' primary label={modalType === 'create' ? 'Add Team' : 'Update Team'} disabled={createLoading || updateLoading} />
          </ModalActions>
        </FormWrapper>
      </Modal>
    )
}

export default TeamModal;