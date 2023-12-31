const mongoose=require("mongoose");

const dbConnection=()=>{
    mongoose
    .connect(process.env.URL).then((conn)=>{
        console.log(`Database connected:${conn.connection.host}`);
    // }).catch((err)=>{
    //     console.log(`Database error:${err}`);
    //     process.exit(1);
     });
};
module.exports=dbConnection;