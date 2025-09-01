# تعليمات تنفيذ تعديلات موقع الفارس للأعمال

## 1. استبدال الشعار
- استخدم الشعار الجديد المتوفر بالرابط:  
  https://i.postimg.cc/sD8XhB8w/image.png
- ضع الصورة الجديدة في مجلد الصور للموقع (مثلاً: images/horse-logo.png).
- استبدل كل الشعارات القديمة في جميع صفحات الموقع بالشعار الجديد.
- احذف أو تجاهل أي صورة أو كود للشعار القديم.

## 2. شاشة تحميل تفاعلية
- أضف الكود التالي قبل إغلاق وسم <body> في الصفحة الرئيسية (index.html):

<div id="preloader">
  <img src="images/horse-logo.png" id="preloader-logo" alt="loading">
</div>

- أضف الكود التالي إلى ملف CSS الرئيسي:

#preloader {
  position: fixed; left: 0; top: 0; width: 100vw; height: 100vh;
  background: #fff; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.5s;
}
#preloader-logo {
  width: 100px; animation: spin 1s linear infinite;
}
@keyframes spin { 100% { transform: rotate(360deg); } }

- أضف الكود التالي إلى ملف JavaScript الرئيسي:

window.onload = function() {
  document.getElementById('preloader').style.opacity = 0;
  setTimeout(function() {
    document.getElementById('preloader').style.display = 'none';
  }, 500);
};

## 3. تحديث أيقونات الواتساب والاتصال
- استبدل أكواد الأيقونات القديمة بالأكواد التالية:

<!-- واتساب -->
<a href="https://wa.me/xxxx" class="floating-icon whatsapp">
  <i class="fab fa-whatsapp"></i>
</a>
<!-- اتصال -->
<a href="tel:xxxx" class="floating-icon call">
  <i class="fas fa-phone-alt"></i>
</a>

- أضف هذا الكود لـ CSS (أو حدثه):

.floating-icon {
  position: fixed; bottom: 20px;
  width: 60px; height: 60px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 32px; transition: box-shadow 0.2s, transform 0.2s;
  z-index: 999;
}
.whatsapp { right: 90px; background: #25d366; }
.call { right: 20px; background: #2196f3; }
.floating-icon:hover { box-shadow: 0 0 20px #aaa; transform: scale(1.1); }

- تأكد من وجود مكتبة FontAwesome، أو استخدم أيقونات SVG بديلة.

## 4. إزالة الشعار القديم بالكامل من الموقع.

## بعد الانتهاء:
- ضع جميع الملفات المعدلة في ملف zip وأرسله للعميل.