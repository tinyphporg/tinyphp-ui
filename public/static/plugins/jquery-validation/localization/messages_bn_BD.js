!function(e){"function"==typeof define&&define.amd?define(["jquery","../jquery.validate"],e):"object"==typeof module&&module.exports?module.exports=e(require("jquery")):e(jQuery)}((function(e){return e.extend(e.validator.messages,{required:"এই তথ্যটি আবশ্যক।",remote:"এই তথ্যটি ঠিক করুন।",email:"অনুগ্রহ করে একটি সঠিক মেইল ঠিকানা লিখুন।",url:"অনুগ্রহ করে একটি সঠিক লিঙ্ক দিন।",date:"তারিখ সঠিক নয়।",dateISO:"অনুগ্রহ করে একটি সঠিক (ISO) তারিখ লিখুন।",number:"অনুগ্রহ করে একটি সঠিক নম্বর লিখুন।",digits:"এখানে শুধু সংখ্যা ব্যবহার করা যাবে।",creditcard:"অনুগ্রহ করে একটি ক্রেডিট কার্ডের সঠিক নম্বর লিখুন।",equalTo:"একই মান আবার লিখুন।",extension:"সঠিক ধরনের ফাইল আপলোড করুন।",maxlength:e.validator.format("{0}টির বেশি অক্ষর লেখা যাবে না।"),minlength:e.validator.format("{0}টির কম অক্ষর লেখা যাবে না।"),rangelength:e.validator.format("{0} থেকে {1} টি অক্ষর সম্বলিত মান লিখুন।"),range:e.validator.format("{0} থেকে {1} এর মধ্যে একটি মান ব্যবহার করুন।"),max:e.validator.format("অনুগ্রহ করে {0} বা তার চাইতে কম মান ব্যবহার করুন।"),min:e.validator.format("অনুগ্রহ করে {0} বা তার চাইতে বেশি মান ব্যবহার করুন।")}),e}));