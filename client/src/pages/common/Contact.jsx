import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import api from "../../auth/Services/api";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing marker icon issue in React Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact/sendMessage", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="contact" className="bg-[#01133d] text-white px-6 py-12">
      <motion.section
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Contact Info */}
        <address className="not-italic py-27">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 mb-8">
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <ul className="space-y-4 text-gray-400">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@example.com">support@example.com</a>
            </li>
            <li>
              <strong>Phone:</strong> <a href="tel:+1234567890">+123 456 7890</a>
            </li>
            <li>
              <strong>Location:</strong> Lahore, Pakistan
            </li>
          </ul>
        </address>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-[#012465] p-8 rounded-xl shadow space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#01133d] text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#01133d] text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#01133d] text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 px-4 rounded text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.section>

      {/* Leaflet Map Section */}
      <motion.div
        className="max-w-6xl mx-auto mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">Find Us on Map</h2>
        <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-gray-700">
          <MapContainer
            center={[31.5204, 74.3587]} // Lahore coordinates
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[31.5204, 74.3587]}>
              <Popup>Lahore, Pakistan</Popup>
            </Marker>
          </MapContainer>
        </div>
      </motion.div>
    </main>
  );
};

export default ContactPage;
