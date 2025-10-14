# دليل تنفيذ Google Analytics - موقع الفارس للأعمال
## Google Analytics Implementation Guide

---

## 🎯 الهدف | Objective
إضافة Google Analytics 4 (GA4) لتتبع زوار الموقع وسلوكهم وقياس الأداء.

---

## 📋 الخطوات المطلوبة | Required Steps

### 1. إنشاء حساب Google Analytics
1. انتقل إلى: https://analytics.google.com
2. أنشئ حساباً جديداً أو استخدم حساب Google موجود
3. اختر "إنشاء حساب" → "للويب"
4. أدخل المعلومات:
   - اسم الحساب: "الفارس للأعمال"
   - اسم الموقع: "alfarissa.org"
   - رابط الموقع: https://alfarissa.org
   - الدولة: السعودية
   - المجال: خدمات قانونية وإدارية

### 2. الحصول على رمز التتبع
بعد إنشاء الحساب، ستحصل على:
- **Measurement ID**: يبدأ بـ `G-XXXXXXXXXX`
- رمز gtag للتضمين في الموقع

---

## 💻 التنفيذ التقني | Technical Implementation

### إضافة الرمز في ملفات HTML

في كل ملف HTML، أضف الكود التالي قبل إغلاق tag `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### الملفات المطلوب تحديثها:
- [ ] index.html
- [ ] our-services-page.html
- [ ] legal-services-page.html
- [ ] government-transactions-page.html
- [ ] packages-page.html
- [ ] faq-page.html
- [ ] vision-page.html
- [ ] licenses-page.html
- [ ] zakat-tax-page.html
- [ ] privacy-policy-page.html
- [ ] terms-of-service-page.html

---

## 🎯 أحداث التتبع المقترحة | Suggested Tracking Events

### تتبع النقرات على أرقام الهاتف:
```javascript
// تتبع النقرات على أرقام الهاتف
document.querySelectorAll('a[href^="tel:"]').forEach(function(element) {
    element.addEventListener('click', function() {
        gtag('event', 'phone_call_click', {
            'event_category': 'contact',
            'event_label': this.getAttribute('href')
        });
    });
});
```

### تتبع النقرات على واتساب:
```javascript
// تتبع النقرات على واتساب
document.querySelectorAll('a[href*="wa.me"]').forEach(function(element) {
    element.addEventListener('click', function() {
        gtag('event', 'whatsapp_click', {
            'event_category': 'contact',
            'event_label': 'whatsapp_contact'
        });
    });
});
```

### تتبع طلبات الخدمات:
```javascript
// تتبع طلبات الخدمات
function trackServiceRequest(serviceName) {
    gtag('event', 'service_request', {
        'event_category': 'services',
        'event_label': serviceName
    });
}
```

---

## 🔧 التحديث المطلوب في common.js

في الملف `js/common.js`، أضف الكود التالي:

```javascript
// Google Analytics Event Tracking
function initializeAnalyticsTracking() {
    // تتبع النقرات على أرقام الهاتف
    document.querySelectorAll('a[href^="tel:"]').forEach(function(element) {
        element.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call_click', {
                    'event_category': 'contact',
                    'event_label': this.getAttribute('href')
                });
            }
        });
    });
    
    // تتبع النقرات على واتساب
    document.querySelectorAll('a[href*="wa.me"]').forEach(function(element) {
        element.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'contact',
                    'event_label': 'whatsapp_contact'
                });
            }
        });
    });
    
    console.log('✅ Analytics tracking initialized');
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeAnalyticsTracking);
```

---

## 📊 إعدادات Analytics المقترحة

### الأهداف (Goals) المقترحة:
1. **اتصال هاتفي** - نقرة على رقم الهاتف
2. **رسالة واتساب** - نقرة على رابط واتساب  
3. **طلب خدمة** - ملء النماذج
4. **تصفح الخدمات** - زيارة صفحات الخدمات

### التقارير المفيدة:
- **الزوار في الوقت الفعلي**
- **مصادر المرور** (Google, مباشر, وسائل التواصل)
- **الصفحات الأكثر زيارة**
- **سلوك المستخدم** (مدة الجلسة، معدل الارتداد)
- **الموقع الجغرافي للزوار**
- **الأجهزة المستخدمة** (جوال، حاسوب، لوحي)

---

## ✅ قائمة تدقيق ما بعد التنفيذ

بعد إضافة الكود:

- [ ] التأكد من ظهور البيانات في Analytics (خلال 24-48 ساعة)
- [ ] اختبار تتبع الأحداث (النقر على الهاتف/واتساب)
- [ ] ربط Analytics مع Search Console
- [ ] إعداد التقارير المخصصة
- [ ] إعداد التنبيهات للأنشطة غير العادية

---

## 🚨 تنبيهات مهمة

1. **استبدال G-XXXXXXXXXX** برمز التتبع الفعلي من Google Analytics
2. **إضافة الكود في جميع الصفحات** لضمان التتبع الشامل
3. **اختبار الكود** قبل النشر النهائي
4. **تحديث سياسة الخصوصية** لذكر استخدام Google Analytics
5. **مراقبة البيانات** لأول أسبوع للتأكد من صحة التتبع

---

## 📞 الدعم التقني

للمساعدة في التنفيذ:
- دعم Google Analytics: https://support.google.com/analytics
- التواصل مع فريق الموقع: info@alfarissa.org

آخر تحديث: 14 أكتوبر 2024