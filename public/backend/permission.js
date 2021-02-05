let data = [];
$('.approve').on('click', (e) => {
    e.preventDefault();
    const id = $('#idUser').val();
    const reqData = {
        idUser: id,
        rules: data
    }
    fetch('/admin/permission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqData)
        })
        .then(res => res.json())
        .then(res => {
            // if (res.success) {
            //     $('.show-noti')
            //         .append('<div id="toast-container" class="toast-bottom-right"><div class="toast toast-success" aria-live="polite" style=""><div class="toast-title">Update successfully</div><div class="toast-message">Congrats! Your category has been updated successfully!</div></div></div>');
            //     $("#toast-container").fadeTo(3000, 0, function() {
            //         $('#toast-container').remove();
            //     });
            // } else {
            //     alert(res.message)
            // }
        })
});

function check(event, key) {
    if (event.target.checked) {
        data.push(key);
        return;
    }
    if (data.some(x => x === key)) {
        const index = data.indexOf(key);
        if (index > -1) {
            data.splice(index, 1);
        }
    }
}