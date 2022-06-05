//date
var today= moment();
$("currentDay").text(today.format("dddd.mmm Do"));




//time blocks color coded

//enter event for block

//save event 

////local storage

var tasks = {
    "9":[],
    "10":[],
    "11":[],
    "12":[],
    "1":[],
    "2":[],
    "3":[],
    "4":[],
    "5":[],
};

var setTasks=function() {
    localStorage.setItem("tasks", JSON.stringify("tasks"));
}

var getTasks=function() {
    var loadTasks=JSON.parse(localStorage.getItem("tasks"));
    if(loadTasks) {
        tasks=loadTasks

        $.each(tasks, function(hour,task){
            var hourDiv=$("#"+hour);
            createTask(task, hourDiv);
        })
    }
    auditTasks()
}

var createTask=function(taskText, hourDiv) {
    var taskDiv=hourDiv.find(".task");
    var taskP=$("<p>")
        .addClass("description")
        .text(taskText)
    taskDiv.html(taskP)    
}

var auditTasks=function() {
    var currentHour=moment().hour();
    $(".task-info").each(function(){
        var elementHour = parseInt($(this).attr("id"));
        
        if (elementHour<currentHour) {
            $(this).removeClass(["present", "future"]).addClass("past");
        }
        else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
}

var replaceTextarea = function(textareaElement) {
   

    var taskInfo = textareaElement.closest(".task-info");
    var textArea = taskInfo.find("textarea");

    
    var time = taskInfo.attr("id");
    var text = textArea.val().trim();

   
    tasks[time] = [text];  

  
    createTask(text, taskInfo);
}

(".task").click(function() {

    $("textarea").each(function() {
        replaceTextarea($(this));
    })

    var time = $(this).closest(".task-info").attr("id");
    if (parseInt(time) >= moment().hour()) {

        var text = $(this).text();
        var textInput = $("<textarea>")
            .addClass("form-control")
            .val(text);

        $(this).html(textInput);
        textInput.trigger("focus");
    }
})


$(".saveBtn").click(function() {
    replaceTextarea($(this));
})


timeToHour = 3600000 - today.milliseconds(); 
setTimeout(function() {
    setInterval(auditTasks, 3600000)
}, timeToHour);

getTasks();