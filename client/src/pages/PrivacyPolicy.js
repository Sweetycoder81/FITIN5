import React from 'react';
import { Container } from 'react-bootstrap';

const PrivacyPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <section className="py-5">
      <Container>
        <h1 className="mb-2">Privacy Policy</h1>
        <p className="text-muted mb-4">Last Updated: {lastUpdated}</p>

        <p>
          This Privacy Policy describes how we collect, use, disclose, and safeguard information when you visit or use our services (the "Services").
        </p>

        <h5 className="mt-4">1. Information We Collect</h5>
        <p className="mb-1"><strong>Personal Information</strong>: such as your name and email address.</p>
        <p className="mb-1"><strong>Usage Data</strong>: including IP address, browser type/version, referring/exit pages, and timestamps.</p>
        <p className="mb-3"><strong>Cookies</strong> and similar technologies to remember preferences and analyze usage.</p>

        <h5 className="mt-4">2. How We Use Information</h5>
        <ul className="mb-3">
          <li>To provide and maintain the Services.</li>
          <li>To improve functionality, performance, and user experience.</li>
          <li>To respond to inquiries and provide support.</li>
          <li>To comply with applicable laws and legal obligations.</li>
        </ul>

        <h5 className="mt-4">3. Information Sharing and Disclosure</h5>
        <p className="mb-1">We may disclose information to trusted service providers who perform services on our behalf (e.g., hosting, analytics), subject to appropriate safeguards.</p>
        <p className="mb-1">We may disclose information if required by law, regulation, or legal process, or to protect rights, property, or safety.</p>
        <p className="mb-3"><strong>We do not sell or rent</strong> personal information.</p>

        <h5 className="mt-4">4. Data Security</h5>
        <p>
          We implement reasonable administrative, technical, and physical safeguards designed to protect information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h5 className="mt-4">5. Your Choices</h5>
        <ul className="mb-3">
          <li><strong>Promotional communications</strong>: You may opt out of promotional emails by following the unsubscribe instructions in those emails.</li>
          <li><strong>Cookies</strong>: Most browsers allow you to remove or reject cookies via settings. Doing so may affect certain features of the Services.</li>
        </ul>

        <h5 className="mt-4">6. Cookies and Tracking</h5>
        <p>
          Cookies are small text files placed on your device to store data. We use cookies to remember preferences and analyze site usage. You can manage cookies through your browser settings.
        </p>

        <h5 className="mt-4">7. Third-Party Links</h5>
        <p>
          The Services may contain links to third-party websites. We are not responsible for the privacy practices or content of those third parties.
        </p>

        <h5 className="mt-4">8. Data Retention</h5>
        <p>
          We retain information only for as long as necessary to fulfill the purposes outlined in this Policy, unless a longer retention period is required or permitted by law.
        </p>

        <h5 className="mt-4">9. Children’s Privacy</h5>
        <p>
          Our Services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13.
        </p>

        <h5 className="mt-4">10. Changes to This Policy</h5>
        <p>
          We may update this Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and will be effective as soon as it is accessible.
        </p>

        <h5 className="mt-4">11. Contact Us</h5>
        <p className="mb-0">Email: info@fitin5.com</p>
        <p>Address: 123 Fitness Street, Workout City, WC 12345</p>
      </Container>
    </section>
  );
};

export default PrivacyPolicy;
