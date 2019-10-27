document.addEventListener('DOMContentLoaded', function() {
    console.log('ready');

    document.forms[0]
        .addEventListener('submit', function(e) {
            e.preventDefault();
            //console.log(this.elements);
            var data = Object.create(null);
            [].forEach.call(this.elements, function(elem) {
                var name = elem.getAttribute('name'),
                    value = elem.value;
                if(name && value !== '') {
                    data[name] = value;
                }
            });
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/users');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.addEventListener('load', function() {
                console.log(xhr.responseText);
            });
            try {
                var dataString = JSON.stringify(data);
                xhr.send(dataString);
                //debugger;
            } catch(err) {
                console.log(err.message);
            }
        });
});