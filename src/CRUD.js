import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';


export default function Crud() {

    let successNotify = () => {
        toast.success("Data Insert Successfully..")
    }

    let DeleteNotify = () => {
        toast.error("Data Deleted Successfully..")
    }

    let editNotify = () => {
        toast.info("Data Update Successfully...")
    }

    let [formData, setFormData] = useState({
        uName: '',
        uEmail: '',
        uPhone: '',
        uMessage: '',
        index: ''
    })

    let getValue = (event) => {
        let oldData = { ...formData };
        let inputName = event.target.name;
        // console.log(inputName)
        let inputValue = event.target.value;

        oldData[inputName] = inputValue
        setFormData(oldData)
    }


    let [userData, setUserData] = useState([])

    let handleSubmit = (event) => {

        let currentUserFromData = {
            uName: formData.uName,
            uEmail: formData.uEmail,
            uPhone: formData.uPhone,
            uMessage: formData.uMessage
        }

        if (formData.index === "") {

            let checkFilterUser = userData.filter((v) => v.uEmail === formData.uEmail || v.uPhone === formData.uPhone)

            if (checkFilterUser.length === 1) {

                toast.warn("Email or Phone Already Exists")
            }
            else {
                let olduserData = [...userData, currentUserFromData]  // old data and current input data 
                // console.log(olduserData)  // store data yahan dekh sakty hy
                setUserData(olduserData)

                // Submit krny k baad form data reset ho jay ga
                setFormData({
                    uName: '',
                    uEmail: '',
                    uPhone: '',
                    uMessage: '',
                    index: ''
                });

                successNotify();

            }


        }

        else {
            let Editindex = formData.index;
            let copyData = userData;

            let checkFilterUser = userData.filter((v, i) => (v.uEmail === formData.uEmail || v.uPhone === formData.uPhone) && i !== Editindex)

            if (checkFilterUser.length === 0) {
                copyData[Editindex]['uName'] = formData.uName
                copyData[Editindex]['uEmail'] = formData.uEmail
                copyData[Editindex]['uPhone'] = formData.uPhone
                copyData[Editindex]['uMessage'] = formData.uMessage

                setUserData(copyData)

                setFormData({
                    uName: '',
                    uEmail: '',
                    uPhone: '',
                    uMessage: '',
                    index: ''
                });
                editNotify();
            }
            else {
                toast.warn("Email or Phone Already Exists")
            }



        }

        event.preventDefault();
    }

    let handleDelete = (indexNumber) => {
        // alert(indexNumber)
        let FilterDataAfterDel = userData.filter((v, i) => i !== indexNumber)
        setUserData(FilterDataAfterDel)

        setFormData({
            uName: '',
            uEmail: '',
            uPhone: '',
            uMessage: '',
            index: ''
        });
    }

    let handleEdit = (indexNo) => {
        let editData = userData.filter((v, i) => i === indexNo)[0]
        // console.log(editData)
        editData['index'] = indexNo  // 5 enteries le kr ayy ga
        // {uName: 'xeshan1', uEmail: 'xee@gmail.com', uPhone: '123456789yuk01', uMessage: 'ngjfdjj', index: 1}
        setFormData(editData)
    }

    return (

        <Container fluid>
            <ToastContainer position="top-right" autoClose={2000} />
            <Container>
                <Row>
                    <Col className="text-center mt-5">
                        <h1>CRUD App</h1>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col className="text-start md={6}">
                        {/* {userData.length} */}
                        <Form onSubmit={handleSubmit}>
                            <div className='form-group mb-3'>
                                <label>Name</label>
                                <input type="text" className="form-control" name='uName' onChange={getValue} value={formData.uName} placeholder="Enter name" />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Email</label>
                                <input type="email" className="form-control" name='uEmail' onChange={getValue} value={formData.uEmail} placeholder="Enter email" />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Phone Number</label>
                                <input type="tel" className="form-control" name='uPhone' onChange={getValue} value={formData.uPhone} placeholder="Enter phone number" />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Message</label>
                                <textarea className="form-control" name='uMessage' onChange={getValue} value={formData.uMessage} rows={3} ></textarea>
                            </div>
                            <Button variant="primary" type="submit" className="mb-3">
                                {formData.index !== '' ? 'Update' : "Save"}
                            </Button>
                        </Form>
                    </Col>
                    <Col md={6}>
                        {/* Bootstrap Table with proper buttons */}
                        <Table striped bordered hover responsive>
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {userData.length >= 1 ?

                                    userData.map((v, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{v.uName}</td>
                                                <td>{v.uEmail}</td>
                                                <td>{v.uPhone}</td>
                                                <td>{v.uMessage}</td>
                                                <td>
                                                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(index)}> Edit </Button>
                                                    <Button variant="danger" size="sm" onClick={() => { handleDelete(index); DeleteNotify() }} > Delete </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        {/* colSpan 6 col ki jagga le lega.. */}
                                        <td colSpan={6}> NO Data FOund</td>
                                    </tr>
                                }


                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </Container >
    )
}
