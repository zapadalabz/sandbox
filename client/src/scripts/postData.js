import { getTopicDirectory } from "./getData";

export async function postCourse(formData){
    const response = await fetch(`/api/courses/${window.user.OrgUnitId}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
        'Content-Type': 'application/json'
        },
    }).catch(error => {
        window.alert(error);
        return;
    });

    const post = await response.json();

    return post;
}

export async function postUser(user){
    
    const response = await fetch(`/api/user/newUser/`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(user)
       });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.log(message);
      return;
    }

    const post = await response.json();

    return post;
}

export async function postUserQuizStatsByTopic(type, topicBody){
    const response = await fetch(`/api/user/${type}/newUserQuizStats`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(topicBody)
       });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.log(message);
      return;
    }

    const post = await response.json();

    return post;
}

export async function newUser(user, course){
    //post newUser in User
    postUser(user);
    //if Learner, add to course members
    if(user.role === "Learner"){
        //add userID
        course.members.push(user.userId);
        postCourse(course);
    }

    //get allTopics
    getTopicDirectory(course.type).then((resp)=>{
        var allTopics = resp.topicList;
        //post template for QuizStats
        for(var i = 0; i< allTopics.length; i++){
            let topicNum = i + 1;
            var topicBody = {
                UserId : user.UserId,
                topicNum: topicNum,
                difficutly: {
                    easy: 0,
                    medium: 0,
                    hard: 0
                },
                sections: []
            }
            var sectionBody = {
                difficulty: {
                    easy: 0,
                    medium: 0,
                    hard: 0
                },
                viewed : [],
                correct: [],
                incorrect: [],
                averageTime: 0
            }
            for(var j = 1; j < allTopics[i].length;j++){
                topicBody.sections.push(sectionBody);
            }
            postUserQuizStatsByTopic(course.type,topicBody);
        }  
    })
    

    //post template for LOStats

    //post template for Reflections
    
}

export async function initStudent(data){
    const response = await fetch(`/api/initStudent`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
        },
    }).catch(error => {
        window.alert(error);
        return;
    });

    const post = await response.json();

    return post;
}

export async function addParents(data){
    const response = await fetch(`/api/addParents`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
        },
    }).catch(error => {
        window.alert(error);
        return;
    });

    const post = await response.json();

    return post;
}

export async function addReflection(data){
    const response = await fetch(`/api/addReflection`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
        },
    }).catch(error => {
        window.alert(error);
        return;
    });

    const post = await response.json();

    return post;
}