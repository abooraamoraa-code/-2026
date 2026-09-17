/**
 * إعدادات الاتصال السحابي وحماية لوحة الإدارة
 */
const StoreConfig = {
    apiKey: "$2a$10$Hj8N/vpuugwh9k/pupGakulkBIE4pq3W09JTAUiUKbtJfiWBdpJHS",
    binId: "6aaa882affd5d160530df70d",
    baseUrl: "https://api.jsonbin.io/v3/b",
    // كلمة المرور المشفرة للوحة التحكم (كلمة المرور الحالية هي: mom2026)
    adminSecretHash: "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5" 
};

// خوارزمية تشفير بسيطة لفحص كلمة المرور دون كشفها في الكود
async function verifyAdminPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex === StoreConfig.adminSecretHash;
}
