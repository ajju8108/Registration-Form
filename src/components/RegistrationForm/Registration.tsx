import ReCAPTCHA from "react-google-recaptcha";
import "./Registration.css";
import {
  Form,
  Input,
  Space,
  Button,
  FormInstance,
  Select,
  Checkbox,
  Row,
  Col,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const prefixSelector = (
  <Form.Item noStyle>
    <Select defaultValue="91" style={{ width: 70 }}>
      <Select.Option value="+91">+91</Select.Option>
    </Select>
  </Form.Item>
);

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = useState(false);
  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <>
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        Submit
      </Button>
    </>
  );
};

const Registration = () => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([{}]);

  const onFinish = (values: any) => {
    console.log("Success", values);
  };

  useEffect(() => {
    setFields([{ key: 0 }]);
  }, []);

  return (
    <>
      <h2>Billing Address</h2>
      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              className="formItem textColor"
              name="name"
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                { required: true },
                {
                  pattern: new RegExp("^[0-9]*.?[0-9]+$"),
                  message: "Enter a valid Age",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                },
                {
                  pattern: new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
                  message: "Enter a valid email address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: new RegExp("^[7-9][0-9]{9}$"),
                  message: "Please enter valid indian phone number",
                },
              ]}
            >
              <Input addonBefore={prefixSelector} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="occupation"
              label="Occupation"
              rules={[{ required: true }]}
            >
              <Form.Item
                name="occupation"
                rules={[{ required: true, message: "Province is required" }]}
              >
                <Select placeholder="Select province">
                  <Select.Option value="Arcitect">Architect</Select.Option>
                  <Select.Option value="Engineer">Engineer</Select.Option>
                  <Select.Option value="Doctor">Doctor</Select.Option>
                </Select>
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
        {/* Add new Address */}
        <Form.List name="address">
          {(fields, { add, remove }) => {
            if (fields.length === 0) {
              add();
            }
            return (
              <>
                {fields.map(({ key, name }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      label={`# ${key + 1}`}
                      className="form-address-section"
                    >
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{ float: "right" }}
                      />
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            name={[name, "address_1"]}
                            label="Address 1"
                            rules={[
                              { required: true, message: "Address 1 required" },
                            ]}
                          >
                            <Input placeholder="Address 1" />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item
                            name={[name, "address_2"]}
                            label="Address 2"
                            rules={[
                              { required: true, message: "Address 2 required" },
                            ]}
                          >
                            <Input placeholder="Address 2" />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item
                            name={[name, "city"]}
                            label="City"
                            rules={[
                              { required: true, message: "City required" },
                            ]}
                          >
                            <Input placeholder="City" />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item
                            name={[name, "state"]}
                            label="State"
                            rules={[
                              { required: true, message: "State required" },
                            ]}
                          >
                            <Input placeholder="State" />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item
                            name={[name, "pincode"]}
                            label="Pincode"
                            rules={[
                              {
                                required: true,
                                message: "Pincode",
                              },
                              {
                                pattern: new RegExp("^[0-9]{6,6}$"),
                                message: "Please enter a valid pincode",
                              },
                            ]}
                          >
                            <Input placeholder="Pincode" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add New Address
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="captcha"
            rules={[{ required: true, message: "please complete the captcha" }]}
          >
            <ReCAPTCHA sitekey="6LdRf0AmAAAAAIi1OnD0e82SQfMEAQOETzQgqCjT" />
          </Form.Item>

          <Space>
            <SubmitButton form={form} />
            <Button
              htmlType="reset"
              onClick={() => console.log(form, "MYData")}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default Registration;
