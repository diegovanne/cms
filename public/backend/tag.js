$('.btn-submit.update').on('click', (e) => {
    let validateIncorrect = false;
    e.preventDefault();
    let data = {};
    $('[name]').each((i, e) => {
        let $this = $(e);
        let val = $(e).val();
        data[$this.attr('name')] = val;
    });
    $('.invalid-feedback').append('');
    if (!data.title) {
        $('.title.invalid-feedback').css('display', 'block').text('Title request your information!');
        validateIncorrect = true;
    } else {
        $('.title.invalid-feedback').css('display', 'none');
    }
    if (!data.slug) {
        $('.slug.invalid-feedback').css('display', 'block').text('Slug request your information!');
        validateIncorrect = true;
    } else {
        $('.slug.invalid-feedback').css('display', 'none');
    }
    if (validateIncorrect) {
        return;
    }
    fetch('/admin/tag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                $('.show-noti')
                    .append('<div id="toast-container" class="toast-bottom-right"><div class="toast toast-success" aria-live="polite" style=""><div class="toast-title">Update successfully</div><div class="toast-message">Congrats! Your tag has been updated successfully!</div></div></div>');
                $("#toast-container").fadeTo(3000, 0, function() {
                    $('#toast-container').remove();
                });
            } else {
                alert(res.message)
            }
        })
});

$('.btn-submit.create').on('click', (e) => {

    let validateIncorrect = false;
    let data = {};
    $('[name]').each((i, e) => {
        let $this = $(e);
        let val = $(e).val();
        data[$this.attr('name')] = val;
    });
    $('.invalid-feedback').append('');
    if (!data.title) {
        $('.title.invalid-feedback').css('display', 'block').text('Title request your information!');
        validateIncorrect = true;
    } else {
        $('.title.invalid-feedback').css('display', 'none');
    }

    if (!data.slug) {
        $('.slug.invalid-feedback').css('display', 'block').text('Slug request your information!');
        validateIncorrect = true;
    } else {
        $('.slug.invalid-feedback').css('display', 'none');
    }

    if (validateIncorrect) {
        return;
    }

    e.preventDefault();

    fetch('/admin/tag/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                $('.btn-submit.create').remove();
                $('.show-noti')
                    .append('<div id="toast-container" class="toast-bottom-right"><div class="toast toast-success" aria-live="polite" style=""><div class="toast-title">Add new successfully</div><div class="toast-message">Congrats! Your tag has been added successfully!</div></div></div>');
                $("#toast-container").fadeTo(3000, 0, function() {
                    $('#toast-container').remove();
                });
            } else {
                alert(res.message)
            }
        })
});

function goToDelete(id) {
    fetch(`/admin/tag/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                window.location = '/admin/tag';
                $('.show-noti')
                    .append('<div id="toast-container" class="toast-bottom-right"><div class="toast toast-success" aria-live="polite" style=""><div class="toast-title">Delete Successfully!</div><div class="toast-message">Congrats! Your tag has successfully been deleted!</div></div></div>');
                $("#toast-container").fadeTo(3000, 0, function() {
                    $('#toast-container').remove();
                });
            } else {
                alert(res.message)
            }
        })
}

$('.btn-back').on('click', (e) => {
    e.preventDefault();
    window.location = '/admin/tag';
});