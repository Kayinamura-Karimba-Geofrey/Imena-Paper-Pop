import React, { useState } from 'react';
import axios from 'axios';
import './InvitationForm.css';

interface InvitationData {
    title: string;
    date: string;
    time: string;
    location: string;
    agenda: string;
    notes: string;
}

const InvitationForm: React.FC = () => {
    const [formData, setFormData] = useState<InvitationData>({
        title: '',
        date: '',
        time: '',
        location: '',
        agenda: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/invitations/generate', formData, {
                responseType: 'blob' // Important for handling binary data (PDF)
            });

            // Create a Blob from the PDF Stream
            const file = new Blob([response.data], { type: 'application/pdf' });

            // Build a URL from the file
            const fileURL = URL.createObjectURL(file);

            // Open the URL on new Window
            const pdfWindow = window.open();
            if (pdfWindow) {
                pdfWindow.location.href = fileURL;
            }

            // Optional: download directly
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = `Invitation-${formData.title.replace(/\s+/g, '-')}.pdf`;
            link.click();

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card fade-in">
            <h2>Create Your Invitation</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Event Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        placeholder="e.g. Wihogora Family Gathering"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="form-control"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                className="form-control"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-control"
                        placeholder="e.g. Kigali Convention Center"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="agenda">Agenda</label>
                    <textarea
                        id="agenda"
                        name="agenda"
                        className="form-control"
                        placeholder="List the key activities..."
                        value={formData.agenda}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Additional Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        className="form-control"
                        placeholder="Any special instructions for guests..."
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Invitation PDF'}
                </button>
            </form>
        </div>
    );
};

export default InvitationForm;
