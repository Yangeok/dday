const params = new URLSearchParams(location.search)

const dayParam = params.get('d')
const nameParam = params.get('name')
const alignParam = params.get('align')
const textParam = params.get('text')

const dayone = new Date(Number(dayParam.slice(0, 4)), Number(dayParam.slice(4, 6)) - 1, Number(dayParam.slice(6, 8)))
const subtracted = new Date().getTime() - dayone.getTime()
const dday = Math.floor(subtracted / (1_000 * 86_400)) * -1

function generateOutput({ text, name }, calculated) {    
    let result

    switch (true) {
        case (calculated < 0):
            result = 'D-' + String(calculated * -1)
            break
        case (calculated === 0):
            result = 'D-Day'
            break
        case (calculated > 0):
            result = 'D+' + String(calculated)
            break
    }

    if (text && (text.indexOf('[day]') != -1)) {
        result = text.replace('[day]', String(result)) 
    }
    if (name) {
        result = `${name} ${result}`
    }
    
    return result
}

const output = generateOutput({ text: textParam, name: nameParam }, dday)

if (dayParam == '') {
    output = '날짜를 잘못 선택했어요.'
}

$(() => {
    $('#dday').html(output)

    if (alignParam === 'left') {
        $('.d').css('justify-content', 'flex-start')
    } 
    if (alignParam == 'right') {
        $('.d').css('justify-content', 'flex-end')
    }

    if (window.matchMedia) {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                const scheme = e.matches === true ? 'dark' : 'light'
        
                switch (scheme) {
                    case 'dark':
                        console.log('set dark mode')
                        $('#mode').addClass('night')
                        $('#mode').removeClass('day')
                        $('#menu').text('☀')
                        break
                    case 'light':
                        console.log('set light mode')
                        $('#mode').addClass('day')
                        $('#mode').removeClass('night')
                        $('#menu').text('🌙')
                        break
                    default:
                        $('#mode').addClass('night')
                        $('#mode').removeClass('day')
                        $('#menu').text('☀')
                        break
                }
            })
    }
    
    document.querySelector('.container.left').addEventListener('click', () => {
        if ($('#setting').hasClass('show')) {
            $('#setting').removeClass('show')
        } else {
            $('#setting').addClass('show')
            $('#menu').removeClass('show')
        }
    })

    document.querySelector('.container.right').addEventListener('click', () => {
        if ($('#setting').hasClass('user')) {
            if ($('#menu').hasClass('show')) {
                $('#menu').removeClass('show')
            } else {
                $('#menu').addClass('show')
                $('#setting').removeClass('show')
            }
        }
    })

    if (localStorage.getItem('mode') === 'night') {
        if ($('#setting').hasClass('user')) {
            $('#mode').addClass('night')
            $('#mode').removeClass('day')
        }
    }

    document.querySelector('#setting').addEventListener('click', () => {
        if ($('#setting').hasClass('system')) {
            $('#setting').removeClass('system')
            $('#setting').addClass('user')
        } else {
            $('#setting').removeClass('user')
            $('#setting').addClass('system')
            $('#mode').addClass('day')
            $('#mode').removeClass('night')
        }
    })

    document.querySelector('#menu').addEventListener('click', () => {
        if ($('#setting').hasClass('user')) {
            if ($('#mode').hasClass('day')) {
                $('#mode').addClass('night')
                $('#mode').removeClass('day')
                $('#menu').text('☀')
                localStorage.setItem('mode', 'night')
            } else {
                $('#mode').addClass('day')
                $('#mode').removeClass('night')
                $('#menu').text('🌙')
                localStorage.setItem('mode', 'day')
            }
        }
    })
})
