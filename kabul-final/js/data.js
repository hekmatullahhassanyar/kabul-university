// All site content lives in these arrays; pages build their HTML from them with DOM manipulation.
const programs = [
 {id:1,name:"Computer Science",faculty:"Computer Science",level:"Bachelor",credits:140,years:4,seats:120,desc:"Programming, algorithms, databases and software engineering."},
 {id:2,name:"Information Systems",faculty:"Computer Science",level:"Bachelor",credits:136,years:4,seats:80,desc:"Design and manage information systems for organizations."},
 {id:3,name:"Law",faculty:"Law and Political Science",level:"Bachelor",credits:132,years:4,seats:150,desc:"Afghan and international law, legal writing and court practice."},
 {id:4,name:"Political Science",faculty:"Law and Political Science",level:"Master",credits:48,years:2,seats:40,desc:"Governance, diplomacy and public policy research."},
 {id:5,name:"Economics",faculty:"Economics",level:"Bachelor",credits:134,years:4,seats:130,desc:"Micro and macroeconomics, statistics and development economics."},
 {id:6,name:"Business Administration",faculty:"Economics",level:"Master",credits:54,years:2,seats:50,desc:"Management, finance and entrepreneurship for decision makers."},
 {id:7,name:"Civil Engineering",faculty:"Engineering",level:"Bachelor",credits:144,years:4,seats:90,desc:"Structures, roads, water systems and construction management."},
 {id:8,name:"Geology",faculty:"Geosciences",level:"Bachelor",credits:138,years:4,seats:60,desc:"Minerals, earth materials and field mapping in Afghan mountains."},
 {id:9,name:"Dari Literature",faculty:"Literature and Humanities",level:"Bachelor",credits:130,years:4,seats:100,desc:"Classical and modern Dari and Pashto literature and criticism."},
 {id:10,name:"Journalism",faculty:"Literature and Humanities",level:"Bachelor",credits:128,years:4,seats:70,desc:"Reporting, editing, media ethics and digital storytelling."},
 {id:11,name:"Physics",faculty:"Science",level:"Master",credits:52,years:2,seats:30,desc:"Advanced theory and laboratory research in physics."},
 {id:12,name:"Sociology",faculty:"Social Sciences",level:"Bachelor",credits:130,years:4,seats:85,desc:"Society, communities, research methods and social change."}
];
const events = [
 {id:1,title:"Open Day for Future Students",date:"2026-12-12",category:"Admissions",place:"Main Campus Hall",desc:"Meet professors, tour faculties and ask about entrance rules."},
 {id:2,title:"Winter Computer Science Hackathon",date:"2026-12-20",category:"Student life",place:"Computer Science building",desc:"24 hours of building useful apps in mixed teams."},
 {id:3,title:"Public Lecture: Law and Reconstruction",date:"2027-01-09",category:"Academic",place:"Law Faculty Auditorium",desc:"Guest speakers discuss legal systems after conflict."},
 {id:4,title:"Dari Poetry Evening",date:"2027-01-16",category:"Culture",place:"Literature Faculty Garden",desc:"Students and teachers read classical and new poems."},
 {id:5,title:"Scholarship Application Workshop",date:"2027-01-23",category:"Admissions",place:"Library Reading Room",desc:"Step-by-step help with documents and deadlines."},
 {id:6,title:"Engineering Project Fair",date:"2027-02-06",category:"Academic",place:"Engineering Courtyard",desc:"Final-year teams present bridges, models and prototypes."},
 {id:7,title:"Inter-Faculty Football Cup",date:"2027-02-13",category:"Student life",place:"University Sports Field",desc:"Every faculty sends a team. Free entry for all students."},
 {id:8,title:"Spring Career Day",date:"2027-03-06",category:"Academic",place:"Main Campus Hall",desc:"Employers and NGOs meet graduates and final-year students."}
];
const spots = [
 {title:"Main Gate",img:"gate.jpg",alt:"The main entrance of Kabul University",credit:"",text:"The entrance where every new student starts the first day.",c1:"#1B3A6B",c2:"#E0A526"},
 {title:"Central Library",img:"library.jpg",alt:"Students reading in a university library",credit:"",text:"Quiet reading rooms and shelves in Dari, Pashto and English.",c1:"#0E1F3D",c2:"#5E86C7"},
 {title:"Computer Labs",img:"lab.jpg",alt:"Students working at computers in a lab",credit:"",text:"Lab rooms used for programming and information systems classes.",c1:"#2A5298",c2:"#E0A526"},
 {title:"Student Garden",img:"garden.jpg",alt:"Students sitting together in a campus garden",credit:"",text:"A green place to rest between classes and meet friends.",c1:"#1E7A55",c2:"#E0A526"},
 {title:"Sports Field",img:"sports.jpg",alt:"Students playing football on a field",credit:"",text:"Football, volleyball and morning training for students.",c1:"#1B3A6B",c2:"#1E7A55"},
 {title:"Lecture Auditorium",img:"hall.jpg",alt:"A full lecture hall during a university event",credit:"",text:"The large hall for public lectures and ceremonies.",c1:"#5E86C7",c2:"#0E1F3D"}
];
const quizQuestions = [
 {q:"What is 15% of 200?",options:["20","30","35","40"],answer:1,topic:"Math"},
 {q:"Which word means almost the same as “rapid”?",options:["Slow","Quiet","Fast","Late"],answer:2,topic:"English"},
 {q:"What comes next: 2, 4, 8, 16, ?",options:["24","30","32","36"],answer:2,topic:"Logic"},
 {q:"What is the capital city of Afghanistan?",options:["Herat","Kabul","Kandahar","Balkh"],answer:1,topic:"General"},
 {q:"A train travels 60 km in one hour. How far in 3 hours?",options:["120 km","150 km","180 km","200 km"],answer:2,topic:"Math"},
 {q:"Which of these is a programming language?",options:["Python","Pascal's law","Photosynthesis","Parliament"],answer:0,topic:"Computers"},
 {q:"Which word is a noun?",options:["Quickly","Library","Beautiful","Run"],answer:1,topic:"English"},
 {q:"What is the chemical formula of water?",options:["CO2","O2","H2O","NaCl"],answer:2,topic:"Science"}
];
const visitSlots = [
 {id:1,day:"Saturday",date:"2026-12-12",time:"10:00",tour:"Main gate and faculties",seats:5},
 {id:2,day:"Saturday",date:"2026-12-12",time:"13:00",tour:"Library and study rooms",seats:4},
 {id:3,day:"Sunday",date:"2026-12-13",time:"10:00",tour:"Computer labs",seats:3},
 {id:4,day:"Sunday",date:"2026-12-13",time:"13:00",tour:"Sports field and garden",seats:6},
 {id:5,day:"Monday",date:"2026-12-14",time:"09:30",tour:"Law faculty",seats:2},
 {id:6,day:"Monday",date:"2026-12-14",time:"14:00",tour:"Science laboratories",seats:5},
 {id:7,day:"Tuesday",date:"2026-12-15",time:"10:30",tour:"Admissions office",seats:1},
 {id:8,day:"Tuesday",date:"2026-12-15",time:"13:30",tour:"Student life walk",seats:4}
];
