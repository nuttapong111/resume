# การตั้งค่า EmailJS สำหรับส่งอีเมล

## 📧 วิธีการตั้งค่า EmailJS

### 1. สร้างบัญชี EmailJS
1. ไปที่ [https://www.emailjs.com/](https://www.emailjs.com/)
2. สมัครสมาชิกหรือเข้าสู่ระบบ
3. ไปที่ Dashboard

### 2. เพิ่ม Email Service
1. ไปที่ **Email Services** ในเมนูซ้าย
2. คลิก **Add New Service**
3. เลือก **Gmail** (หรือ email provider อื่น)
4. ตั้งค่า Gmail account ของคุณ
5. บันทึก **Service ID** (เช่น: `service_portfolio`)

### 3. สร้าง Email Template
1. ไปที่ **Email Templates** ในเมนูซ้าย
2. คลิก **Create New Template**
3. ตั้งค่า template ดังนี้:

**Template ID**: `template_contact`

**Subject**: ข้อความจาก Portfolio - {{subject}}

**Content**:
```
ชื่อ: {{from_name}}
อีเมล: {{from_email}}
หัวข้อ: {{subject}}

ข้อความ:
{{message}}

---
ส่งจาก Portfolio Website
```

### 4. ตั้งค่า Public Key
1. ไปที่ **Account** > **General**
2. คัดลอก **Public Key**
3. แทนที่ `YOUR_PUBLIC_KEY` ในไฟล์ `index.html` ด้วย Public Key ของคุณ

### 5. อัปเดต Service ID และ Template ID
ในไฟล์ `script.js` แก้ไข:
```javascript
emailjs.send('service_portfolio', 'template_contact', templateParams)
```

ให้ตรงกับ Service ID และ Template ID ที่คุณสร้าง

## 🔧 ไฟล์ที่ต้องแก้ไข

### index.html
```html
<script type="text/javascript">
    (function(){
        emailjs.init("YOUR_PUBLIC_KEY"); // เปลี่ยนเป็น Public Key ของคุณ
    })();
</script>
```

### script.js
```javascript
emailjs.send('service_portfolio', 'template_contact', templateParams)
// เปลี่ยน service_portfolio และ template_contact ให้ตรงกับที่คุณสร้าง
```

## ✅ การทดสอบ

1. เปิดเว็บไซต์
2. ไปที่ส่วน Contact
3. กรอกข้อมูลในฟอร์ม
4. คลิกส่งข้อความ
5. ตรวจสอบอีเมลของคุณ

## 🚨 หมายเหตุ

- EmailJS มี free plan ที่ให้ส่งอีเมลได้ 200 ฉบับ/เดือน
- ต้องใช้ HTTPS สำหรับ production
- ตรวจสอบ spam folder หากไม่ได้รับอีเมล
