
import React from 'react'
import ModalBody from '../../UiComponents/Modal/ModalBody'
import ModalTitle from '../../UiComponents/Modal/ModalTitle'
import Modal from '../../UiComponents/Modal'
import { useActions, useAppSelector } from '@/lib/hooks'
import { useForm } from 'react-hook-form'
import { ITeamUserFormProps } from '@/utils/commonTypes'
import FormLabelInput from '../../UiComponents/Form/FormLabelInput'
import FormWrapper from '../../UiComponents/Form/FormWrapper'
import FormLevelDropdown from '../../UiComponents/Form/FormLabelDropdown'
import { teamUserRoleDropdown, teamUserStatusDropdown } from '@/utils/dataFeed'
import ModalActions from '../../UiComponents/Modal/ModalActions'
import UiButton from '../../UiComponents/Button/UiButton'
import { useGetTeamsQuery, useInviteTeamUserMutation, useUpdateTeamUserMutation } from '@/lib/api/coreApi'
import UiLoader from '../../UiComponents/UiLoader'
import { emailPatten } from '@/lib/utils'

const TeamUserModal = () => {

  const isOpen = useAppSelector(state => state.teamUserModal.isOpen);
  const modalType = useAppSelector(state => state.teamUserModal.modalType);
  const formState = useAppSelector(state => state.teamUserModal.initialValues);

  const [inviteTeamUser, { isLoading: inviteLoading }] = useInviteTeamUserMutation();
  const [updateTeamUser, { isLoading: updateLoading }] = useUpdateTeamUserMutation();

  const id = 'abc';
  const { data: { teamDropdown } = {}, isLoading } = useGetTeamsQuery(id);
  const { closeTeamUserModal, toggleSuccessSnackbar, toggleErrorSnackbar } = useActions();

  const methods = useForm<ITeamUserFormProps>({ defaultValues: formState });
  const { handleSubmit } = methods;


  const handleClose = () => {
    closeTeamUserModal();
  }

  const onSubmit = (props: ITeamUserFormProps) => {

    const modalMap = {
      create: {
        fn: inviteTeamUser,
        successMessage: 'User Invite Sent Successfully',
        errorMessage: 'Invite Sent Failed'
      },
      edit: {
        fn: updateTeamUser,
        successMessage: 'User Updated Successfully',
        errorMessage: 'User Update Failed'
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
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalTitle onClose={handleClose}>{'Invite User'}</ModalTitle>
        {isLoading ? <UiLoader /> : <ModalBody>
          <div className="flex gap-2 w-full">
            <FormLabelInput
              disabled={inviteLoading || updateLoading}
              className='flex-1'
              fullWidth name='name'
              placeholder='Full Name'
              label="Full Name"
              rules={{ required: 'Please provide full name' }}
            />
            <FormLabelInput
              className='flex-1'
              fullWidth name='email'
              placeholder='Email Address'
              disabled={modalType === 'edit' || inviteLoading || updateLoading}
              label="Email Address"
              rules={{
                required: "Email is Required",
                pattern: {
                  value: emailPatten,
                  message: "Invalid Email Format",
                },
              }} />

          </div>
          <div className="flex gap-2 w-full my-2">
            <FormLevelDropdown name='status' disabled={inviteLoading || updateLoading} dropDownItem={teamUserStatusDropdown} placeholder='Status' label='User Status' rules={{ required: 'Status Is Required' }} />
            <FormLevelDropdown name='role' disabled={inviteLoading || updateLoading} dropDownItem={teamUserRoleDropdown} placeholder='Role' label='Role' rules={{ required: 'Role Is Required' }} />
          </div>
          {teamDropdown && <FormLevelDropdown name='team' fullWidth dropDownItem={teamDropdown} placeholder='Team' label='Team' rules={{ required: 'Team Is Required' }} />}
        </ModalBody>}
        <ModalActions>
          <UiButton onClick={() => handleClose()} label='Cancel' />
          <UiButton type='submit' primary label={modalType === 'create' ? 'Send Invite' : 'Update User'} disabled={inviteLoading || updateLoading} />
        </ModalActions>
      </FormWrapper>
    </Modal>
  )
}

export default TeamUserModal;
