import React from 'react';
import { Container } from 'react-bootstrap';

const TermsOfService = () => {
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <section className="py-5">
      <Container>
        <h1 className="mb-2">Terms of Service</h1>
        <p className="text-muted mb-4">Last Updated: {lastUpdated}</p>

        <h5 className="mt-4">1. Acceptance of Terms</h5>
        <p>
          By accessing or using our website, applications, and services (the "Services"), you agree to be bound by these Terms of Service (the "Terms"). If you do not agree, you may not use the Services.
        </p>

        <h5 className="mt-4">2. Eligibility</h5>
        <p>
          You must be of legal age in your jurisdiction or have valid parental/guardian consent to use the Services.
        </p>

        <h5 className="mt-4">3. User Conduct</h5>
        <p>
          You agree not to use the Services for any unlawful purpose, to harass or harm others, to interfere with or disrupt the Services, or to attempt to gain unauthorized access to any systems or networks.
        </p>

        <h5 className="mt-4">4. Account Responsibility</h5>
        <p>
          You are responsible for maintaining the security of your account and the confidentiality of your login credentials, and for all activities that occur under your account.
        </p>

        <h5 className="mt-4">5. Content Ownership and License</h5>
        <p>
          You retain ownership of content you submit or upload ("User Content"). By providing User Content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, display, and distribute such content solely for operating and improving the Services.
        </p>

        <h5 className="mt-4">6. Service Usage and Availability</h5>
        <p>
          The Services are provided on an "as is" and "as available" basis. We may modify, suspend, or discontinue any part of the Services, with notice where reasonably practicable.
        </p>

        <h5 className="mt-4">7. Termination</h5>
        <p>
          We may suspend or terminate your access to the Services at any time if you violate these Terms or engage in conduct that we deem harmful to the Services or other users.
        </p>

        <h5 className="mt-4">8. Limitation of Liability</h5>
        <p>
          To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the Services.
        </p>

        <h5 className="mt-4">9. Intellectual Property</h5>
        <p>
          The Services and all related content, including but not limited to logos, design, text, graphics, and software, are our property or the property of our licensors and are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our prior written consent.
        </p>

        <h5 className="mt-4">10. Changes to These Terms</h5>
        <p>
          We may update these Terms from time to time. The updated version will be indicated by an updated "Last Updated" date and will be effective upon posting. Your continued use of the Services constitutes acceptance of the revised Terms.
        </p>

        <h5 className="mt-4">11. Governing Law</h5>
        <p>
          These Terms are governed by the laws of [Your State/Country], without regard to its conflict of laws principles. You agree to the exclusive jurisdiction of the courts located in [Your State/Country].
        </p>

        <h5 className="mt-4">12. Contact</h5>
        <p className="mb-0">Email: info@fitin5.com</p>
        <p>Address: 123 Fitness Street, Workout City, WC 12345</p>
      </Container>
    </section>
  );
};

export default TermsOfService;
