require('dotenv').config()
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const cors=require('cors');

const db=process.env.URL;
mongoose.connect(db,{

    useNewUrlParser: true, 
    useUnifiedTopology: true    
     
}).then(()=>{
        
    console.log("connected")
    
}).catch((err)=>console.log(err));
    
const Schema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true,
        trim:true
    },
    status:{
        type:String,
        default:"uncompleted",
        require:true
    }   
})
const User=mongoose.model('Users',Schema);
const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',async(req,res)=>{
   const user= await User.find();
   res.json({user});
})

app.post('/add',async(req,res)=>{
    try{
        const {name}=req.body;
        const date=new Date().toLocaleDateString();
        const newItem=new User({
            name,date
        });
        await newItem.save();
        res.json({msg:"saved sucessfully"});

    }
    catch(err){
        console.log(err);
    }
   
})
app.post('/delete',async(req,res)=>{
    const{id}=req.body
    User
    .findByIdAndDelete(id)
    .then(()=>{
        res.json("deleted successfully..")
    })
    .catch((err)=>{
        console.log(err)
    })
   
})
app.post('/update',async(req,res)=>{
    
        const {id,name}=req.body;
        User.findByIdAndUpdate(id,{name,status:"uncompleted"})
        .then(()=>{
            res.json("updated successfully..")
        })
        .catch((err)=>{
            console.log(err)
        })

    
})
app.post('/done',async(req,res)=>{
    
    const {id}=req.body;
    User.findByIdAndUpdate(id,{status:"completed"})
    .then(()=>{
        res.json("completed successfully..")
    })
    .catch((err)=>{
        console.log(err)
    })


})
app.post('/drag',async(req,res)=>{
    
    const {_id}=req.body;
    User.findByIdAndUpdate(_id,{status:"completed"})
    .then(()=>{
        res.json("completed successfully..")
    })
    .catch((err)=>{
        console.log(err);
    })


})


app.listen(5000,()=>{
    console.log("listening to port 5000");
})
