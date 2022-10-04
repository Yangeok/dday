function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    let results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

let day_ori = getParameterByName('d')
let name = getParameterByName('name')
let align = getParameterByName('align')
let text = getParameterByName('text')

let dayone = new Date(Number(day_ori.slice(0, 4)), Number(day_ori.slice(4, 6)) - 1, Number(day_ori.slice(6, 8)))
let gap = new Date().getTime() - dayone.getTime()
let result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1

let output = ''

if (text != '' && (text.indexOf('[day]') != -1)) {
    if (result < 0) {
        result = result * -1
    }
    output = text.replace('[day]', String(result))
} else {
    if (result > 0) {
        output = 'D-' + String(result)
    } else if (result < 0) {
        result = result * -1
        output = 'D+' + String(result)
    } else if (result === 0) {
        output = 'D-day'
    }

    if (name != '') {
        output = name + ' ' + output
    }
}

if (day_ori == '') {
    output = '날짜를 잘못 선택했어요.'
}

$(() => {
    function setColorScheme(scheme) {
        switch (scheme) {
            case 'dark':
                console.log('set dark mode')
                $('#mode').addClass('night')
                $('#mode').removeClass('day')
                $('#memu').text('☀')
                localStorage.setItem('mode', 'night')
                break
            case 'light':
                console.log('set light mode')
                $('#mode').addClass('day')
                $('#mode').removeClass('night')
                $('#memu').text('🌙')
                localStorage.setItem('mode', 'day')
                break
            default:
                $('#mode').addClass('night')
                $('#mode').removeClass('day')
                $('#memu').text('☀')
                break
        }
    }

    function getPreferredColorScheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    if (window.matchMedia) {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', setColorScheme(getPreferredColorScheme()))
    }

    if (localStorage.getItem('mode') === 'night') {
        $('#mode').addClass('night')
        $('#mode').removeClass('day')
    }

    $('#dday').html(output)

    if (align === 'left') {
        $('.d').css('justify-content', 'flex-start')
    } else if (align == 'right') {
        $('.d').css('justify-content', 'flex-end')
    }

    $('body').click(() => {
        if ($('#memu').hasClass('show')) {
            $('#memu').removeClass('show')
        } else {
            $('#memu').addClass('show')
        }
    })

    $('#memu').click(() => {
        if ($('#mode').hasClass('day')) {
            $('#mode').addClass('night')
            $('#mode').removeClass('day')
            $('#memu').text('☀')
            localStorage.setItem('mode', 'night')
        } else {
            $('#mode').addClass('day')
            $('#mode').removeClass('night')
            $('#memu').text('🌙')
            localStorage.setItem('mode', 'day')
        }
    })

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if ($('#mode').hasClass('day')) {
            $('#mode').addClass('night')
            $('#mode').removeClass('day')
            $('#memu').text('☀')
            localStorage.setItem('mode', 'night')
        } else {
            $('#mode').addClass('day')
            $('#mode').removeClass('night')
            $('#memu').text('🌙')
            localStorage.setItem('mode', 'day')
        }
    })
})
