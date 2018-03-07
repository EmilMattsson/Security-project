"use strict"

// Configuation for e-mail
module.exports = {
  from: 'eesecsys@gmail.com',
  to: 'emil.emanuel@hotmail.com',
  subject: 'Security breach!',
  text: '',
  attachments: [
            {
                filename: 'test.jpg',
                path: '/home/emil/Security-project/test0.jpg'
            },
            {
                filename: 'test1.jpg',
                path: '/home/emil/Security-project/test1.jpg'
            },
            {
                filename: 'test2.jpg',
                path: '/home/emil/Security-project/test2.jpg'
            },
            {
                filename: 'test3.jpg',
                path: '/home/emil/Security-project/test3.jpg'
            },
            {
                filename: 'test4.jpg',
                path: '/home/emil/Security-project/test4.jpg'
            }
        ]
}
