// const cds = require('@sap/cds');
// module.exports = cds.service.impl(function(){
//     this.on('READ', 'StudentInfo', async function(req){
//         const ID = req.params;
//         console.log("Hello", ID );
//         if(ID.length != 0){
//             let res = await SELECT.from `studentDb.StudentInfo`.where ({ ID: req.data.ID });
//             return res
//         }
//         else{
//             let res = await SELECT.from `studentDb.StudentInfo`;
//             return res
//         }
//     }),
//     this.on('UPDATE', 'StudentInfo', async function(req){
//         try {
//             let data = req.data;
//             let ID = req.data.ID
//             console.log("Result ", ID);
//             console.log("Result ", data);
//             let res = await INSERT.into('studentDb.StudentInfo',data) 
//             console.log("Result ", res);
//             return res
//         } catch (error) {
           
//         }
//     })

//     // this.on('CREATE', 'StudentInfo', async function(req){
//     //     try {
//     //         let data = req.data;
//     //         console.log("Result ", data);
//     //         let res = await INSERT.into('studentDb.StudentInfo',data) 
//     //         console.log("Result ", res);
//     //         return res
//     //     } catch (error) {
           
//     //     }
//     // })

// })