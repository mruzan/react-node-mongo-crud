import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Table, Container, Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormFeedback, Label, Alert } from 'reactstrap';
import { getSchools, addSchool } from '../actions/index';

class SchoolList extends Component {
  constructor() {
    super();

    this.state = {
      schoolList: [],
      isOpen: false,
      showAlert: false,
      school: {
        name: '',
        street: '',
        suburb: '',
        postcode: '',
        state: '',
        studentCount: 0,
      },
      error: false,
      errors: {
        name: null,
        street: null,
        suburb: null,
        postcode: null,
        state: null,
        studentCount: null,
      },
    };

  }

  componentDidMount() {
    this.props.getSchools();
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps.schools ==>", nextProps.schools.schools);
    if (nextProps.schools && nextProps.schools.schools && nextProps.schools.schools.data.schools) {
      this.setState({
        schoolList: nextProps.schools.schools.data.schools
      });
    }
    if(nextProps.schools && nextProps.schools && nextProps.schools.saveResponse){
      this.setState({ isOpen: false }, () => {
        this.props.getSchools();
        this.showAlert();
      });
    }
  }

  showAlert(){
    this.setState({
      showAlert: true
    }, function () {
      setTimeout(() => {
        this.setState({showAlert: false});
      }, 3000);
    });
  }

  searchSchool = (value) => {
    setTimeout(() => {
      this.props.getSchools({search: value, page: 1});
    }, 1000);
  }

  close(){
    this.setState({ isOpen: false });
  }

  addSchool(){
    const { errors } = this.state;
    errors.name = null;
    errors.street = null;
    errors.suburb = null;
    errors.postcode = null;
    errors.state = null;
    errors.studentCount = null;

    this.setState({ isOpen: true, errors });
  }

  onChangeFields = (e) => {
    const { school } = this.state;
    const property = e.target.name;
    const value = e.target.value;
    school[property] = value;
    this.setState({ school });
  }

  validate() {
    const { school } = this.state;
    let error = false;

    const errors =  {
      name: null,
      street: null,
      suburb: null,
      postcode: null,
      state: null,
      studentCount: null,
    }

    if(!school.name) { errors.name = 'School name cannot be empty'; error = true }

    if(!school.street) { errors.street = 'Address street cannot be empty'; error = true }

    if(!school.suburb) { errors.suburb = 'Address suburb cannot be empty'; error = true }

    if(!school.postcode) { errors.postcode = 'Address postcode cannot be empty'; error = true }
    else if(school.postcode.length < 5) { errors.postcode = 'Invalid postcode'; error = true}

    if(!school.state) { errors.state = 'Address state cannot be empty'; error = true }
    else if(school.state.length < 2) { errors.state = 'Invalid state'; error = true}

    if(!school.studentCount) { errors.studentCount = 'Student count cannot be empty'; error = true }
    else if(school.studentCount.length < 1) { errors.studentCount = 'Invalid student count'; error = true}

    this.setState({ errors});
    return error;
  }

  submitSchool(e){
    e.preventDefault();
    if(!this.validate()){
      const { school } = this.state;
      this.props.addSchool(school);
    }

  }

  render() {
    const { schoolList, isOpen, school, errors, showAlert } = this.state;

    const schools = schoolList.length > 0 && schoolList.map(school => {
      return (
        <tr key={school._id}>
          <td>{school.name}</td>
          <td>{school.street}, {school.suburb}, {school.postcode} - {school.state}</td>
          <td>{school.studentCount}</td>
          <td>{school.status === 'active' ? 'Active' : 'Inactive'}</td>
        </tr>
      );
    });

    return (
      <Container className="themed-container" fluid={true}>
        <Row>
          <Col sm="12">
            {
              showAlert && <Alert color="success">
              School successfully created
            </Alert>
            }
          </Col>
        </Row>

        <Row className="form-group">
          <Col>
            <h3>School management</h3>
          </Col>
        </Row>

        <Row>
          <Col md="2" sx="12" sm="2">
            <Button outline color="primary" onClick={() => {this.addSchool()}}>Add School</Button>{' '}
          </Col>
          <Col md="10" sx="12" sm="10">
            <Input type="text" name="search" id="search" placeholder="Search by name and address"  onChange={(e) => {this.searchSchool(e.target.value)}}/>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>No of Student</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              {(schoolList.length > 0) ?
                schools
                :
                <span>No School Found</span>
              }
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal isOpen={isOpen}>
          <ModalHeader>
            Create school
          </ModalHeader>
          <ModalBody>
            <Form >
              <FormGroup>
                <Label for="name">Name of School</Label>
                <Input invalid={errors.name ? true : false}  name="name" id="name" value={school.name} placeholder="Enter the school name" onChange={this.onChangeFields}/>
                {errors.name && <FormFeedback>{errors.name}</FormFeedback>}

              </FormGroup>
              <FormGroup>
                <Label for="street">Street address</Label>
                <Input invalid={errors.street ? true : false} type="text" name="street" id="street" placeholder="Enter street address" value={school.street} onChange={this.onChangeFields}/>
                {errors.street && <FormFeedback>{errors.street}</FormFeedback>}
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="suburb">Suburb</Label>
                    <Input invalid={errors.suburb ? true : false} type="text" name="suburb" id="suburb" placeholder="Enter suburb" value={school.suburb} onChange={this.onChangeFields}/>
                    {errors.suburb && <FormFeedback>{errors.suburb}</FormFeedback>}
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="postcode">Postcode</Label>
                    <Input invalid={errors.postcode ? true : false} type="text" name="postcode" id="postcode" placeholder="Enter postcode" value={school.postcode} onChange={this.onChangeFields}/>
                    {errors.postcode && <FormFeedback>{errors.postcode}</FormFeedback>}
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input invalid={errors.state ? true : false} type="text" name="state" id="state" placeholder="Enter state" value={school.state} onChange={this.onChangeFields}/>
                    {errors.state && <FormFeedback>{errors.state}</FormFeedback>}
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="studentCount">No of Student</Label>
                <Input invalid={errors.studentCount ? true : false} type="number" name="studentCount" id="studentCount" placeholder="Enter number of student" value={school.studentCount} onChange={this.onChangeFields}/>
                {errors.studentCount && <FormFeedback>{errors.studentCount}</FormFeedback>}
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => {this.submitSchool(e)}}>Add School</Button>
            <Button color="default" onClick={() => {this.close()}}>Close</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = {
  getSchools,
  addSchool
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolList)