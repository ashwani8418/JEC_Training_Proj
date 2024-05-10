sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/Dialog","sap/m/BusyDialog","sap/m/Button"],function(e,t,o,n){"use strict";return e.extend("com.ingex.frontedstu.controller.View1",{onInit:function(){},onPressAdd:function(){let e=this;let n=new sap.ui.layout.form.SimpleForm({content:[new sap.m.Label({text:"First Name"}),new sap.m.Input("inputFirstName"),new sap.m.Label({text:"Last Name"}),new sap.m.Input("inputLastName"),new sap.m.Label({text:"Address"}),new sap.m.Input("inputAddress"),new sap.m.Label({text:"Department"}),new sap.m.Input("inputDepartment")]});let s=new t({width:"auto",title:"Add Student",content:n,beginButton:new o({text:"Save",press:async function(){let t=sap.ui.getCore().byId("inputFirstName").getValue();let o=sap.ui.getCore().byId("inputLastName").getValue();let n=sap.ui.getCore().byId("inputAddress").getValue();let a=sap.ui.getCore().byId("inputDepartment").getValue();console.log("First Name:",t);console.log("Last Name:",o);console.log("Address:",n);console.log("Department:",a);let i={firstName:t,lastName:o,address:n,department:a};let r=await e.createEntries(i);s.close();s.destroy()}}),endButton:new o({text:"Cancel",press:function(){s.close();s.destroy()}})});s.open()},createEntries:async function(e){let t=this.getView().getModel();console.log("Creating Entering.... ",e);console.log("Creating oModel.... ",t);let o=t.bindList("/StudentInfo");let n=await o.create(e);t.refresh();return n},onPressAdd1:function(e){if(!this.oDialog){this.loadFragment({name:"com.ingex.frontedstu.fragments.addRecord"}).then(function(e){this.oDialog=e;this.oDialog.open()}.bind(this))}else{this.oDialog.open()}},onUpdateRecordPress:function(e){let t=e.getSource().getBindingContext().getObject();console.log("oContext ",t);const o={createdAt:t.createdAt,createdBy:t.createdBy,modifiedAt:t.modifiedAt,modifiedBy:t.modifiedAtBy,ID:t.ID,firstName:t.firstName,lastName:t.lastName,address:t.address,department:t.department};this.getView().setModel(new sap.ui.model.json.JSONModel(o),"updateModel");console.log("MOdelData ",this.getView().getModel("updateModel").getData());if(!this.oDialog){this.loadFragment({name:"com.ingex.frontedstu.fragments.addRecord"}).then(function(e){this.oDialog=e;e.bindElement("/updateModel");this.oDialog.open()}.bind(this))}else{this.oDialog.open()}},onCancel:function(){this.oDialog.close()},onUpdateSave:async function(){try{let e=this.getView().getModel("updateModel").getProperty("/ID");let t=this.getView().getModel("updateModel").getProperty("/firstName");let o=this.getView().getModel("updateModel").getProperty("/lastName");let s=this.getView().getModel("updateModel").getProperty("/address");let a=this.getView().getModel("updateModel").getProperty("/department");let i=new n({title:"Updating Record",text:"Please wait..."});let r=this.getOwnerComponent().getModel();let l=new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.EQ,e);let d=r.bindList("/StudentInfo",null,null,[l]);let c=await d.requestContexts().then(function(e){console.log(e);e[0].setProperty("firstName",t);e[0].setProperty("lastName",o);e[0].setProperty("address",s);e[0].setProperty("department",a)});i.close();r.refresh();this.onCancel()}catch(e){console.error("Error updating record: ",e)}},onDeleteRecordPress:async function(e){try{let t=e.getSource().getBindingContext();let o=t.getProperty("ID");sap.m.MessageBox.confirm("Are you sure you want to delete this record?",{title:"Confirm Deletion",onClose:async function(e){if(e===sap.m.MessageBox.Action.OK){await this.deleteRecord(o)}}.bind(this)})}catch(e){console.error("Error deleting record: ",e)}},deleteRecord:async function(e){try{let t=this.getView().getModel();let o=new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.EQ,e);let n=t.bindList("/StudentInfo",null,null,[o]);let s=await n.requestContexts();console.log("aContexts valuse",s);if(s.length>0){await s[0].delete();t.refresh();sap.m.MessageToast.show("Record deleted successfully")}else{throw new Error("Entity with ID "+ID+" not found.")}}catch(e){console.error("Error deleting record: ",e)}}})});