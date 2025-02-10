export function GoogleMap() {
  return (
    <div className="p-4">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.747195378548!2d79.62434117514009!3d11.922673688304519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5358e064c07657%3A0x2e53db2890f095ea!2sManakula%20Vinayagar%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1739144911693!5m2!1sen!2sin"
        width="100%"
        height="350"
        loading="lazy"
        allowFullScreen={false}
        className="rounded-2xl"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
