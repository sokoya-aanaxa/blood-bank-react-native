import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../shared/header';
import StyleView from '../assets/style/sidebarstyle';
import Style from '../assets/style/style';
import AsyncStorage from '@react-native-community/async-storage';
import {LoginAction} from '../action/loginAction';
import {metaDataAction} from '../action/metaDataAction';
import {Picker, DatePicker, Toast} from 'native-base';
import apiUrl from '../config/apiUrl';
import {connect} from 'react-redux';

class RequestBlood extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userToken: '',
      profile_id: '',
      patient_name: '',
      patient_mobile: '',
      blood_group: 'select blood group',
      city: '',
      pincode: '',
      state: 'select state',
      hospital_name: '',
      hospital_address: '',
      doctor_name: '',
      hospital_mobile: '',
      date_needed: '',
      bloodgroup: '',
      states: [{state: 'states'}],
      patient_email: '',
      bloodgroup: [{group: 'A+'}],
    };
  }

  async UNSAFE_componentWillMount() {
    const profile_id = await AsyncStorage.getItem('profile_id');
    const token = await AsyncStorage.getItem('token');
    this.setState({profile_id: profile_id});
    this.setState({userToken: token});
    await this.props.metaDataAction(data => {
      if (data.success == true) {
        this.setState({bloodgroup: data.data.bloodgroup});
        this.setState({states: data.data.state});
      } else {
        Toast.show({
          text: data.message,
          position: 'top',
          type: 'warning',
          buttonText: 'Okay',
          buttonTextStyle: {color: 'black', fontSize: 15, textAlign: 'center'},
          buttonStyle: {backgroundColor: '#9a0901'},
          duration: 7000,
        });
      }
    });
  }

  makeRequest() {
    let formData = {
      patient_name: this.state.patient_name,
      patient_mobile: this.state.patient_mobile,
      patient_email: this.state.patient_email,
      blood_group: this.state.blood_group,
      city: this.state.city,
      pincode: this.state.pincode,
      state: this.state.state,
      hospital_name: this.state.hospital_name,
      hospital_address: this.state.hospital_address,
      doctor_name: this.state.doctor_name,
      hospital_mobile: this.state.hospital_mobile,
      date_needed: this.state.date_needed,
    };
    if (formData.patient_name == '') {
      Toast.show({
        text: 'Patient name is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else if (formData.patient_mobile == '') {
      Toast.show({
        text: 'Patient mobile is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else if (formData.patient_email == '') {
      Toast.show({
        text: 'Patient email is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else if (formData.date_needed == '') {
      Toast.show({
        text: 'Date is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else if (formData.blood_group == 'select blood group') {
      Toast.show({
        text: 'Blood group is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else if (formData.doctor_name == '') {
      Toast.show({
        text: 'Doctor name is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else if (formData.hospital_name == '') {
      Toast.show({
        text: 'Hospital name is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else if (formData.hospital_address == '') {
      Toast.show({
        text: 'Hospital address is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else if (formData.city == '') {
      Toast.show({
        text: 'City is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else if (formData.pincode == '') {
      Toast.show({
        text: 'Pincode is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else if (formData.state == 'select state') {
      Toast.show({
        text: 'State is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else if (formData.hospital_mobile == '') {
      Toast.show({
        text: 'Hospital mobile is required',
        position: 'top',
        type: 'warning',
        duration: 3000,
      });
    } else {
      console.log('Form Data', formData);
      fetch(apiUrl.makeRequest, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.state.userToken}`,
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.success == false) {
            Toast.show({
              text: data.message,
              position: 'top',
              type: 'success',
              buttonText: 'Okay',
              buttonTextStyle: {
                color: 'black',
                fontSize: 15,
                textAlign: 'center',
              },
              buttonStyle: {backgroundColor: '#9a0901'},
              duration: 7000,
            });
          } else {
            Toast.show({
              text: data.message,
              position: 'top',
              type: 'warning',
              buttonText: 'Okay',
              buttonTextStyle: {
                color: 'black',
                fontSize: 15,
                textAlign: 'center',
              },
              buttonStyle: {backgroundColor: '#9a0901'},
              duration: 7000,
            });
          }
        });
    }
  }
  render() {
    return (
      <View>
        <Header
          title="Make Request For Blood"
          parentProps={this.props}
          navigation={this.props.navigation}
        />
        <ScrollView>
          <View style={StyleView.container}>
            <View style={StyleView.profileId}>
              <Text style={StyleView.textContainer}>
                Profile ID: {this.state.profile_id}
              </Text>
            </View>

            <View style={StyleView.reg_main}>
              <View style={StyleView.inputView}>
                <TextInput
                  onChangeText={val => {
                    this.setState({patient_name: val});
                  }}
                  style={StyleView.inputField}
                  placeholder="Patient Name"
                />
              </View>
              <View style={StyleView.inputView}>
                <TextInput
                  onChangeText={val => {
                    this.setState({patient_mobile: val});
                  }}
                  style={StyleView.inputField}
                  placeholder="Patient Mobile"
                />
              </View>
              <View style={StyleView.inputView}>
                <TextInput
                  onChangeText={val => {
                    this.setState({patient_email: val});
                  }}
                  style={StyleView.inputField}
                  placeholder="Contact Email"
                />
              </View>
              <View style={StyleView.inputView}>
                <View
                  style={{
                    borderRadius: 14,
                    height: 40,
                    backgroundColor: 'lightgray',
                    justifyContent: 'center',
                    borderWidth: 2,
                  }}>
                  <DatePicker
                    locale={'en'}
                    modalTransparent={false}
                    animationType={'fade'}
                    placeHolderText="date of request"
                    textStyle={{color: 'black'}}
                    placeHolderTextStyle={{
                      color: 'black',
                    }}
                    onDateChange={val => {
                      this.setState({date_needed: val});
                    }}
                    disabled={false}
                  />
                </View>
              </View>
              <View style={StyleView.inputView}>
                <View style={StyleView.dropPicker}>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.blood_group}
                    onValueChange={value => {
                      this.setState({blood_group: value});
                    }}>
                    <Picker.Item
                      label={this.state.blood_group}
                      value={this.state.blood_group}
                    />
                    {this.state.bloodgroup.map((item, key) => {
                      return (
                        <Picker.Item
                          label={item.group}
                          value={item.group}
                          key={key}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={StyleView.inputView}>
                <TextInput
                  onChangeText={val => {
                    this.setState({doctor_name: val});
                  }}
                  style={StyleView.inputField}
                  placeholder="Dr. Name"
                />
              </View>
              <View style={StyleView.inputView}>
                <TextInput
                  onChangeText={val => {
                    this.setState({hospital_name: val});
                  }}
                  style={StyleView.inputField}
                  placeholder="Hospital Name"
                />
              </View>
              <View style={StyleView.inputView}>
                <TextInput
                  onChangeText={val => {
                    this.setState({hospital_address: val});
                  }}
                  style={StyleView.inputField}
                  placeholder="Hospital Address"
                />
              </View>
              <View style={StyleView.inputView}>
                <TextInput
                  onChangeText={val => {
                    this.setState({city: val});
                  }}
                  style={StyleView.inputField}
                  placeholder="City"
                />
              </View>
              <View style={StyleView.inputView}>
                <TextInput
                  onChangeText={val => {
                    this.setState({pincode: val});
                  }}
                  style={StyleView.inputField}
                  placeholder="Pin Code(City)"
                  keyboardType={'numeric'}
                />
              </View>
              <View style={StyleView.inputView}>
                <View style={StyleView.dropPicker}>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.state}
                    onValueChange={value => {
                      this.setState({state: value});
                    }}>
                    <Picker.Item
                      label={this.state.state}
                      value={this.state.state}
                    />
                    {this.state.states.map((item, key) => {
                      return (
                        <Picker.Item
                          label={item.state}
                          value={item.state}
                          key={key}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={StyleView.inputView}>
                <TextInput
                  onChangeText={val => {
                    this.setState({hospital_mobile: val});
                  }}
                  style={StyleView.inputField}
                  placeholder="Hospital mobile"
                />
              </View>
            </View>
            <TouchableOpacity
              style={Style.loginBtn}
              onPress={() => {
                this.makeRequest();
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  margin: 12,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                REQUEST
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {loginstate} = state.LoginReducer;
  const {metaData} = state.metaDataReducer;
  return {
    loginstate,
    metaData,
  };
};
RequestComp = connect(
  mapStateToProps,
  {LoginAction, metaDataAction},
)(RequestBlood);
export default RequestComp;
// export default DonateBlood;
