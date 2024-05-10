sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/m/Dialog",
        "sap/m/BusyDialog",
        "sap/m/Button"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Dialog, Button, BusyDialog) {
        "use strict";

        return Controller.extend("com.ingex.frontedstu.controller.View1", {
            onInit: function () {

            },
            onPressAdd: function () {
                // Function triggered when the "Add" button is pressed

                let that = this; // Store reference to controller context

                // Create a SimpleForm instance for adding student information
                let oForm = new sap.ui.layout.form.SimpleForm({
                    // Define form content
                    content: [
                        // Define input fields for student information
                        new sap.m.Label({
                            text: "First Name"
                        }),
                        new sap.m.Input("inputFirstName"),
                        new sap.m.Label({
                            text: "Last Name"
                        }),
                        new sap.m.Input("inputLastName"),
                        new sap.m.Label({
                            text: "Address"
                        }),
                        new sap.m.Input("inputAddress"),
                        new sap.m.Label({
                            text: "Department"
                        }),
                        new sap.m.Input("inputDepartment")
                    ]
                });

                // Create a dialog box with the SimpleForm as content
                let oDialog = new Dialog({
                    width: "auto", // Adjust the width as needed
                    title: "Add Student", // Set dialog title
                    content: oForm, // Set the SimpleForm as the content
                    beginButton: new Button({
                        text: "Save", // Set button text
                        press: async function () {
                            // Function triggered when the "Save" button is pressed
                            // Retrieve input values from the dialog
                            let firstName = sap.ui.getCore().byId("inputFirstName").getValue();
                            let lastName = sap.ui.getCore().byId("inputLastName").getValue();
                            let address = sap.ui.getCore().byId("inputAddress").getValue();
                            let department = sap.ui.getCore().byId("inputDepartment").getValue();

                            // Log input values
                            console.log("First Name:", firstName);
                            console.log("Last Name:", lastName);
                            console.log("Address:", address);
                            console.log("Department:", department);

                            // Construct student data object
                            let studentData = {
                                firstName: firstName,
                                lastName: lastName,
                                address: address,
                                department: department
                            };

                            // Call createEntries function to add student data
                            let result = await that.createEntries(studentData);
                            oDialog.close(); // Close the dialog
                            oDialog.destroy(); // Destroy the dialog
                        }
                    }),
                    endButton: new Button({
                        text: "Cancel", // Set button text
                        press: function () {
                            // Function triggered when the "Cancel" button is pressed
                            oDialog.close(); // Close the dialog
                            oDialog.destroy(); // Destroy the dialog
                        }
                    })
                });

                // Open the dialog
                oDialog.open();
            },



            createEntries: async function (studentData) {
                let oModel = this.getView().getModel();
                console.log("Creating Entering.... ", studentData);
                console.log("Creating oModel.... ", oModel);

                let oBindList = oModel.bindList("/StudentInfo");
                let res = await oBindList.create(studentData);
                oModel.refresh()
                return res;
            },

            onPressAdd1: function (oEvent) {
                if (!this.oDialog) {
                    this.loadFragment({
                        name: "com.ingex.frontedstu.fragments.addRecord",
                    }).then(function (oDialog) {
                        this.oDialog = oDialog;
                        this.oDialog.open();
                    }.bind(this));
                } else {
                    this.oDialog.open();
                }
            },

            // Function triggered when the "Update" button is pressed
            onUpdateRecordPress: function (oEvent) {
                // Retrieve the context object of the selected item
                let oContext = oEvent.getSource().getBindingContext().getObject();

                // Log the retrieved context object
                console.log("oContext ", oContext);

                // Construct payload object for updating record
                const payLoad = {
                    createdAt: oContext.createdAt, // Get createdAt property from context
                    createdBy: oContext.createdBy, // Get createdBy property from context
                    modifiedAt: oContext.modifiedAt, // Get modifiedAt property from context
                    modifiedBy: oContext.modifiedAtBy, // Get modifiedBy property from context
                    ID: oContext.ID, // Get ID property from context
                    firstName: oContext.firstName, // Get firstName property from context
                    lastName: oContext.lastName, // Get lastName property from context
                    address: oContext.address, // Get address property from context
                    department: oContext.department // Get department property from context
                };

                // Set the updateModel with JSON data based on the payload
                this.getView().setModel(new sap.ui.model.json.JSONModel(payLoad), "updateModel");

                // Log the data of the updateModel
                console.log("MOdelData ", this.getView().getModel("updateModel").getData());

                // Check if the dialog is not yet created
                if (!this.oDialog) {
                    // Load the fragment asynchronously
                    this.loadFragment({
                        name: "com.ingex.frontedstu.fragments.addRecord", // Fragment name to load
                    }).then(function (oDialog) {
                        // When fragment is loaded, set the dialog instance and bind data
                        this.oDialog = oDialog;
                        oDialog.bindElement("/updateModel"); // Bind data to the updateModel
                        this.oDialog.open(); // Open the dialog
                    }.bind(this));
                } else {
                    // If the dialog is already created, open it directly
                    this.oDialog.open();
                }
            },

            // Function triggered when the "Cancel" button is pressed
            onCancel: function () {
                this.oDialog.close(); // Close the dialog
            },


            // Function triggered when the "Save" button is pressed to update a record
            onUpdateSave: async function () {
                try {
                

                    // Get necessary data from the updateModel
                    let ID = this.getView().getModel("updateModel").getProperty("/ID");
                    let firstName = this.getView().getModel("updateModel").getProperty("/firstName");
                    let lastName = this.getView().getModel("updateModel").getProperty("/lastName");
                    let address = this.getView().getModel("updateModel").getProperty("/address");
                    let department = this.getView().getModel("updateModel").getProperty("/department");

                    // Show busy dialog
                    let oBusyDialog = new BusyDialog({
                        title: "Updating Record", // Set dialog title
                        text: "Please wait..." // Set dialog text
                    });
                   // Open busy dialog

                    let oModel = this.getOwnerComponent().getModel(); // Get Table model instance

                    // Create a filter for the entity ID
                    let aFilter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, ID);

                    // Bind to the entity set with the filter
                    let oBindList = oModel.bindList("/StudentInfo", null, null, [aFilter]);

                    // Request the contexts that match the filter
                    let res = await oBindList.requestContexts().then(function (aContexts) {
                        console.log(aContexts);
                        // Update the properties of the context with new values
                        aContexts[0].setProperty("firstName", firstName);
                        aContexts[0].setProperty("lastName", lastName);
                        aContexts[0].setProperty("address", address);
                        aContexts[0].setProperty("department", department);
                    });

                    // Close busy dialog
                    oBusyDialog.close();

                    // Refresh the model to reflect the changes
                    oModel.refresh();

                    // Close the dialog
                    this.onCancel();
                } catch (error) {
                    // Handle errors
                    console.error("Error updating record: ", error);
                }
            },

            // Function triggered when the "Delete" button is pressed to delete a record
            onDeleteRecordPress: async function (oEvent) {
                try {
                    // Get the binding context of the selected item
                    let oContext = oEvent.getSource().getBindingContext();

                    // Retrieve the ID of the record to be deleted
                    let idtoBeDeleted = oContext.getProperty("ID");

                    // Show confirmation dialog for deletion
                    sap.m.MessageBox.confirm(
                        "Are you sure you want to delete this record?", {
                            title: "Confirm Deletion",
                            onClose: async function (oAction) {
                                if (oAction === sap.m.MessageBox.Action.OK) {
                                    // Delete the record
                                    await this.deleteRecord(idtoBeDeleted);
                                }
                            }.bind(this)
                        }
                    );
                } catch (error) {
                    // Handle errors
                    console.error("Error deleting record: ", error);
                }
            },

            // Function to delete a record
            deleteRecord: async function (idtoBeDeleted) {
                try {
                    let oModel = this.getView().getModel(); // Get model instance

                    // Create a filter for the entity ID
                    let aFilter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, idtoBeDeleted);

                  
                    let oBindList = oModel.bindList("/StudentInfo", null, null,[aFilter] );

                    // Request the contexts that match the filter
                    let aContexts = await oBindList.requestContexts();
                    console.log("aContexts valuse", aContexts);


                    // Check if any contexts were found
                    if (aContexts.length > 0) {
                        // Delete the first matching entity
                        await aContexts[0].delete();

                        // Refresh the model to reflect changes
                        oModel.refresh();

                        // Show success message
                        sap.m.MessageToast.show("Record deleted successfully");
                    } else {
                        // If no contexts found, handle as error
                        throw new Error("Entity with ID " + ID + " not found.");
                    }
                } catch (error) {
                    // Handle errors
                    console.error("Error deleting record: ", error);
                }
            }

        });
    });