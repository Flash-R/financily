import React from 'react'
import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'

function IncomeAdd({ isIncomeModalVisible, hideIncomeModal, onFinish }) {
    const [form] = Form.useForm();
    return (
        <Modal
            title={"Add Income"}
            visible={isIncomeModalVisible}
            onCancel={hideIncomeModal}
            footer={null}
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={(values) => {
                    onFinish(values, "Income");
                    form.resetFields();
                }}
            >
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label={"Name"}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please Input the name of the transaction"
                        }
                    ]}
                >
                    <Input type="text" className='Input-wrapper' />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label={"Amount"}
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Please Input the Amout of the transaction"
                        }
                    ]}
                >
                    <Input type="number" className='Input-wrapper' />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label={"Date"}
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: "Please Input the Date of the transaction"
                        }
                    ]}
                >
                    <DatePicker className='Input-wrapper' format="YYYY-MM-DD"/>
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label={"Tags"}
                    name="tags"
                    rules={[
                        {
                            required: true,
                            message: "Please Input the Tags of the transaction"
                        }
                    ]}
                >
                    <Select>
                        <Select.Option value="Salary">Salary</Select.Option>
                        <Select.Option value="Investment">Investment</Select.Option>
                        <Select.Option value="Freelancing">Freelancing</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                    </Select>
                    {/* <Input type="text" className='Input-wrapper' /> */}
                </Form.Item>
                <Form.Item>
                     <Button type="primary" onClick={onFinish} htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default IncomeAdd