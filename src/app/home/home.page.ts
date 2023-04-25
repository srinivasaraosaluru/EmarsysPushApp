import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EmarsysSDKCustom } from 'capacitor-emarsys-sdk-plugin';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public value!: string;
  email: string = "";
  todo = {
    title: ''
  };

  constructor(private formBuilder: FormBuilder) {



  }

  public init() {
    console.log('wrring');

    EmarsysSDKCustom.requestPermissions().then((response: any) => {
      // do something with the token (if required)
      console.log(response);
    });



    EmarsysSDKCustom.register().then((response: any) => {
      // do something with the token (if required)
      console.log('Register 2');
      console.log(response);
    });



    const addListeners = async () => {

      await EmarsysSDKCustom.addListener('pushMessageEvent', (message: any) => {
        // do something
        console.log('wrring 2' + message.eventName);
        alert(message);
      });


    }

    const registerNotifications = async () => {
      let permStatus = await EmarsysSDKCustom.checkPermissions();

      console.info(permStatus)
      await EmarsysSDKCustom.requestPermissions();


      // if (permStatus.result === 'prompt') {
      //   permStatus = await EmarsysSDKCustom.requestPermissions();
      // }

      // if (permStatus.rawValue !== 'granted') {
      //   throw new Error('User denied permissions!');
      // }

      await EmarsysSDKCustom.register();
    }

    // const getDeliveredNotifications = async () => {
    //   const notificationList = await EmarsysSDKCustom.getDeliveredNotifications();
    //   console.log('delivered notifications', notificationList);
    // }

  }

  async getUUID() {
    // this.value =  (await Emarsys.getUUID('test')).value;
    // console.log("My UUID", this.value);

    EmarsysSDKCustom.addListener('pushMessageEvent', (message: any) => {
      // do something
      alert('asdsad');
      console.log('sdsadsad');
    });
  }

  async requestPermissions() {
    EmarsysSDKCustom.requestPermissions().then((response: any) => {
      // do something with the token (if required)
      console.log('From JS Permissions');
      console.log(response.token);
      alert("thank you for allowing me")
    });
  }
  async addListener() {
    EmarsysSDKCustom.register().then((response: any) => {
      console.log('From JS Register');
      console.log(response);
      alert("Registered the token "+response.token)
    });

    // console.log("Set It to System");
    EmarsysSDKCustom.addListener('pushMessageEvent', (message: any) => {
      // do something
      alert('asdsad');
      console.log('Testing.....');
    });
  }

  async getToken(){
    EmarsysSDKCustom.getPushToken().then((response: any) => {
      // do something with the token (if required)
      console.log('From JS Permissions');
      console.log(response.token);
      alert(response.token)
    });

  }

  setToken(){
    console.log(this.email)

    EmarsysSDKCustom.setContact({
      contactFieldId: 3,
      contactFieldValue: this.email,
    });

    alert("Good Job!!!")
  }

  clearToken(){
    console.log("Clear Contact")

    EmarsysSDKCustom.clearContact({
      contactFieldId: 3,
      contactFieldValue: ""
    });


  }
}
