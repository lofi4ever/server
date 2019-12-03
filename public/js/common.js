document.addEventListener('DOMContentLoaded', function(req, res) {
    document.forms['add-task'].addEventListener('submit', function(e) {
        e.preventDefault();
        var data = {};
        [].forEach.call(this.querySelectorAll('[name]'), function(el) {
            data[el.name] = el.value;
        });
        if(!data) return;
        try {
            data = JSON.stringify(data);
        } catch(e) {
            console.log(e);
            return
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/tasks/add');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.addEventListener('load', function() {
            console.log(xhr.responseText);
        });
        xhr.send(data);
    });
});