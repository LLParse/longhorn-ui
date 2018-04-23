import React, { PropTypes } from 'react'
import { connect } from 'dva'
import GroupActions from './GroupActions'
import CreateInstance from './CreateInstance'
import InstanceLister from './InstanceLister'

function Instances({ instances, credentials, loading, dispatch }) {
  const { data, createInstanceModalVisible, selectedRowKeys, noRowSelected } = instances
  const credentialData = credentials.data

  const groupActions = {
    create() {
      dispatch({
        type: 'instances/showCreateInstanceModal',
      })
    },
    stopSelected() {
      dispatch({
        type: 'instances/stopSelected',
        payload: selectedRowKeys,
      })
    },
    startSelected() {
      dispatch({
        type: 'instances/startSelected',
        payload: selectedRowKeys,
      })
    },
    deleteSelected() {
      dispatch({
        type: 'instances/deleteSelected',
        payload: selectedRowKeys,
      })
    },
    noRowSelected,
  }

  const createInstanceModalProps = {
    credentialData,
    visible: createInstanceModalVisible,
    onOk(payload) {
      dispatch({
        type: 'instances/create',
        payload,
      })
    },
    onCancel() {
      dispatch({
        type: 'instances/hideCreateInstanceModal',
      })
    },
  }

  const instanceListProps = {
    loading,
    dataSource: data,
    deleteInstance(record) {
      dispatch({
        type: 'instances/delete',
        payload: record,
      })
    },
    actionInstance(record, action) {
      dispatch({
        type: 'instances/action',
        payload: {
          record,
          action,
        },
      })
    },
    onSelectChange(selectedKeys) {
      dispatch({
        type: 'instances/updateSelectedRows',
        selectedKeys,
      })
    },
    selectedRowKeys,
  }

  return (
    <div>
      <GroupActions {...groupActions} />
      <CreateInstance {...createInstanceModalProps} />
      <InstanceLister {...instanceListProps} />
    </div>
  )
}

Instances.propTypes = {
  instances: PropTypes.object,
  credentials: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func,
}

export default connect(({ instances, credentials, loading }) => ({ instances, credentials, loading: loading.models.instance }))(Instances)
