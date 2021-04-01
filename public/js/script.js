$(function () {
  $('#comment').hide()
  $('#icon-arrow').click(function () {
    if ($(this).hasClass('arrow-up')) {
      $('#comment-box .card-header-icon i').removeClass('arrow-up')
    } else {
      $('#comment-box .card-header-icon i').addClass('arrow-up')
    }
    $('#comment').slideToggle()
  })

  $(':file').on('change', function () {
    const file = this.files[0]
    console.log(file)
    const size = Math.round(file.size / 1024)
    $('.file-name').text(`${file.name + ' - ' + size + 'KB'}`)

    if (size >= 4096) {
      alert('文件大小不能超过4MB')
    }
  })

  $('#submit').click(function () {
    const fd = new FormData()
    const file = $(':file')[0].files[0]
    const title = $('#title').val()
    const description = $('#description').val()
    fd.append('img', file)
    fd.append('title', title)
    fd.append('description', description)
    $.ajax({
      url: '/images',
      method: 'post',
      processData: false,
      contentType: false,
      data: fd,
      success(res) {
        if (res.status === 0) {
          location.href = res.data.url
        }
      }
    })
  })

  $('#like').click(function () {
    $.ajax({
      url: `/images/${$(this).data('id')}/like`,
      method: 'post',
      success(res) {
        if (res.status === 0) {
          $('.like-count').text(res.data.likes)
        }
      }
    })
  })

  $('#submit-comment').click(function () {
    const content = $('#content').val()
    const username = $('#username').val()
    const email = $('#email').val()
    const imageId = $('#like').data('id')
    if (!content || !username || !email) {
      return alert('输入不能为空！')
    }
    $.ajax({
      url: `/images/${imageId}/comment`,
      method: 'post',
      data: {
        username,
        email,
        content
      },
      success(res) {
        console.log(res)
        location.href = `/images/${imageId}`
      }
    })
  })
})
