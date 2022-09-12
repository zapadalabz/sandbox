export async function getCourse(OrgUnitId){
    const response = await fetch(`/api/getCourse/${OrgUnitId}`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.log(message);
      return;
    }

    const course = await response.json();

    return course;
}

export async function getTopicDirectory(type){
    const response = await fetch(`/api/LO/getTopicDirectory/${type}`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.log(message);
      return;
    }
    const directory = await response.json();

    return directory;
}


export async function getQuestions(formData){
    let sections = JSON.stringify(formData.sections);
    //console.log(sections);
    const response = await fetch(`/api/QB/getQuestions/${window.course.type}/${sections}/${formData.numQ}`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.log(message);
      return;
    }
    const questions = await response.json();
    return questions;
}

export async function getQuizSectionData(selTopics){
    let topics = JSON.stringify(selTopics);

    const response = await fetch(`/api/user/${window.course.type}/getUserQuizStats/${topics}/${window.user.UserId}`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.log(message);
      return;
    }
    const sectionData = await response.json();
    return sectionData;
}

export async function getUser(UserId){
    const response = await fetch(`/api/user/getUser/${UserId}`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.log(message);
      return;
    }

    const user = await response.json();

    return user;
}

export async function getSkillsTemplate(OrgUnitId) {
    const response = await fetch(`/api/skillsTemplate/${OrgUnitId}`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const template = await response.json();

    return template.Skills;
}

export async function getUserSkills(OrgUnitId, email){
    const response = await fetch(`/api/skills/${OrgUnitId}/${email}`);

    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }

    const userSkills = await response.json();

    return userSkills.Skills;
}

export async function getData(OrgUnitId, email){
    getSkillsTemplate(OrgUnitId).then(async (template)=>{
        getUserSkills(OrgUnitId,email).then(async (skills)=>{
            var output = template;
            //console.log(skills);
            if (skills !== null){
                for(var i =0;i<skills.length;i++){
                    var rating = template[i].rating;
                    for(var j = 0;j<skills[i].rating.length;j++){
                        rating[j] = skills[i].rating[j];
                    }
                    output[i].rating = rating;                    
                }
                //console.log("output: ", output);
            }
            return output;
        });
    });
}

export async function getStudentData(OrgUnitId) {
    const response = await fetch(`/api/${OrgUnitId}`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const data = await response.json();
    var temp = [];
    for(var i = 0; i < data.length;i++){
        if(data[i].hasOwnProperty("email")){
            temp.push(data[i]);
        }
    }

    return temp;
}

export async function getStudent(OrgUnitId) {
    const response = await fetch(`/api/getStudents/${OrgUnitId}`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const data = await response.json();

    return data;
}