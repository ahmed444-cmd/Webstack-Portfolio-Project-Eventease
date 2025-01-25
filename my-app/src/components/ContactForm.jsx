import React, { useState } from 'react';
import { useMessages } from '../contexts/MessageContext';
import '../styles/contact.css';

const ContactForm = () => {
  const { addMessage } = useMessages();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add message to context
    addMessage({
      ...formData,
      type: 'contact'
    });

    // Show success dialog
    setShowDialog(true);

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    // Hide dialog after 3 seconds
    setTimeout(() => {
      setShowDialog(false);
    }, 3000);
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Message subject"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your message"
            rows="5"
          />
        </div>

        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>

      {showDialog && (
        <div className="success-dialog">
          <div className="success-content">
            <i className="fas fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Your message has been sent to our administrators. We'll get back to you soon!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
