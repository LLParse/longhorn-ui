import React, { PropTypes } from 'react'
import { Button, Modal, Slider, InputNumber, Row, Col, Radio, Checkbox, Input } from 'antd'

const memoryMarks = {
  256: '',
  512: '',
  1024: '',
  2048: '',
  4096: '',
  8192: '',
}

class InstanceCreate extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    namespace: 'default',
    name: '',
    cpus: 1,
    memory: 512,
    image: 'ubuntu',
    start: true,
  }
  onNameChange = (e) => {
    const { value } = e.target
    this.setState({
      name: value,
    })
  }
  onCpusChange = (value) => {
    this.setState({
      cpus: value,
    })
  }
  onMemoryChange = (value) => {
    this.setState({
      memory: value,
    })
  }
  onImageChange = (e) => {
    const { value } = e.target
    this.setState({
      image: value,
    })
  }
  onActionChange = (value) => {
    this.setState({
      start: value,
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = () => {
    const timeout = setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 3000)
    this.setState({
      confirmLoading: true,
    })
    if (this.state.start === true) {
      this.state.action = 'start'
    } else {
      this.state.action = 'stop'
    }
    this.props.createInstance({
      namespace: this.state.namespace,
      name: this.state.name,
      cpus: this.state.cpus,
      memory: this.state.memory,
      image: this.state.image,
      action: this.state.action,
    })
    clearTimeout(timeout)
    this.setState({
      visible: false,
      confirmLoading: false,
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  render() {
    const { visible, confirmLoading, cpus, memory, image, start } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: 5 }}>Create Instance</Button>
        <Modal title="Create Instance"
          wrapClassName="vertical-center-modal"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={12}>
              <Input placeholder="Name" onChange={this.onNameChange} style={{ marginBottom: 5 }} />
            </Col>
            <Col span={4}></Col>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>Name</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Slider min={1} max={32} onChange={this.onCpusChange} value={cpus} />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={32}
                style={{ marginLeft: 16 }}
                value={cpus}
                onChange={this.onCpusChange}
              />
            </Col>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>vCPUs</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Slider min={256} max={8192} marks={memoryMarks} step={null} onChange={this.onMemoryChange} value={memory} />
            </Col>
            <Col span={4}>
              <InputNumber
                min={256}
                max={8192}
                style={{ marginLeft: 16 }}
                value={memory}
                onChange={this.onMemoryChange}
              />
            </Col>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>MiB Memory</p>
            </Col>
          </Row>
          <Row>
            <Col span={17}>
              <Radio.Group value={image} onChange={this.onImageChange} type="primary">
                <Radio.Button value="ubuntu">Ubuntu</Radio.Button>
                <Radio.Button value="centos">CentOS</Radio.Button>
                <Radio.Button value="rancheros">RancherOS</Radio.Button>
                <Radio.Button value="windows7">Windows 7</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={4} style={{ marginLeft: 5, marginTop: 5 }}>
              <p>Base Image</p>
            </Col>
          </Row>
          <Row>
            <Checkbox defaultChecked={start} onChange={this.onActionChange} style={{ marginTop: 16 }}>Start Instance Immediately</Checkbox>
          </Row>
        </Modal>
      </div>
    )
  }
}

InstanceCreate.propTypes = {
  createInstance: PropTypes.func,
}

export default InstanceCreate