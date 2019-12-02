document.addEventListener('DOMContentLoaded', function() {
    console.log('ready');
    var form = document.forms['users-form'],
        buttons = form.querySelectorAll('[type="submit"]');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });
    [].forEach.call(buttons, function(button) {
        button.addEventListener('click', function() {
            var type = this.dataset['type'],
                fields = form.querySelectorAll('[name]'),
                data = Object.create(null),
                encodedData;
            [].forEach.call(fields, function(field) {
                data[field.name] = field.value;
            });
            
            var xhr = new XMLHttpRequest();
            switch(type) {
                case 'request':
                    if(data.id) {
                        xhr.open('GET', '/users/' + data.id);    
                    } else {
                        xhr.open('GET', '/users');
                    }
                    //xhr.setRequestHeader('content-type', 'application/json');
                    xhr.addEventListener('load', function() {
                        console.log(xhr.responseText);
                    });
                    xhr.send();
                    break;
                case 'send':
                    try {
                        encodedData = JSON.stringify(data);
                    } catch(err) {
                        alert(err.message);
                        return;
                    }
                    xhr.open('POST', '/users');
                    xhr.setRequestHeader('content-type', 'application/json');
                    xhr.addEventListener('load', function() {
                        if(xhr.responseText === 'true') {
                            alert('user added');
                        } else {
                            alert('failed to add user');
                        }
                    });
                    xhr.send(encodedData);
                    break;
                case 'delete':
                    if(!data.id) {
                        alert('you should enter id');
                        return;
                    }
                    xhr.open('DELETE', '/users/' + data.id);
                    xhr.addEventListener('load', function() {
                        if(parseInt(xhr.responseText) > 0) {
                            alert('user deleted');
                        } else {
                            alert('failed to delete user');
                        }
                    });
                    xhr.send();
                    break;
                case 'put':
                    if(!data.id) {
                        alert('you should enter id');
                        return;
                    }
                    try {
                        encodedData = JSON.stringify(data);
                    } catch(err) {
                        alert(err.message);
                        return;
                    }
                    xhr.open('PUT', '/users');
                    xhr.setRequestHeader('content-type', 'application/json');
                    xhr.addEventListener('load', function() {
                        console.log(xhr.statusText);
                    });
                    xhr.send(encodedData);
            }
        });
    })
});