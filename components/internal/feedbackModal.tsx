'use client';
import { Button } from '@heroui/button';
import { useFirebase } from '@/contexts/firebase';
import { setFeedback } from '@/Firestore/feedback';
import React, { FormEvent, useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@heroui/modal';
import { addToast } from '@heroui/toast';

interface QuestionType {
  title: string;
  description: string;
}

interface EmojiQuestionProps {
  question: QuestionType;
  optional?: boolean;
  onChange: (title: string, value: number | null) => void;
  error?: boolean;
}

const happyEmojis: Record<string, number> = {'😫': 1, '😊': 2, '😐': 3, '😀': 4, '🤩': 5};

const EmojiQuestion: React.FC<EmojiQuestionProps> = ({ question, optional = false, onChange, error = false }) => {
  const [selected, setSelected] = useState<number | null>(null);
  
  const handleSelect = (index: number) => {
    setSelected(index);
    onChange(question.title, happyEmojis[Object.keys(happyEmojis)[index]]);
  };
  
  return (
    <div className={`mb-8`}>
      <div className="flex justify-between items-center gap-2 mb-2">
        <div className="flex flex-col text-gray-700 font-medium">
          <span className={error ? "text-red-500" : ""}>
            {question.description}
          </span>
          {/* <span className='text-sm mt-[-2px]'>({question.title})</span> */}
        </div>
        {optional ? (
          <span className="text-gray-400 text-sm">(Optional)</span>
        ) : (
          <span
            className={`text-sm text-red-500`}
          >
            (*required)
          </span>
        )}
      </div>
      <div className={`flex mt-2 select-none ${error ? "animate-pulse" : ""}`}>
        {Object.entries(happyEmojis).map(([emoji, value], index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSelect(index)}
            className={`flex items-center justify-center p-2 rounded-full border-2 ${
              error && "bg-red-50"
            } ${
              selected === index ? "border-purple-600" : "border-gray-200"
            } bg-white h-12 w-12 mx-1.5 md:mx-2 transition-all hover:scale-110`}
          >
            <span className="text-2xl">{emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const FeedbackFormModal = ({ formOpened, disabled, setFormClose }: { formOpened: boolean, disabled: boolean, setFormClose: () => void }) => {
  const firebaseContext = useFirebase();
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const fireUserData = firebaseContext?.fireUserData;

  const [feedbackText, setFeedbackText] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, number | null | string>>({});
  const [validationAttempted, setValidationAttempted] = useState<boolean>(false);
  
  const questions = [
    {
      title: "Overall Event Satisfaction",
      description: "How satisfied were you with the event overall?"
    },
    {
      title: "Event Organization",
      description: "How would you rate the organization and execution of the event?"
    },
    {
      title: "Venue and Facilities",
      description: "How satisfied were you with the venue and facilities provided?"
    },
    {
      title: "Event Content",
      description: "How would you rate the quality and relevance of the event content?"
    },
    {
      title: "Future Attendance",
      description: "How likely are you to attend future events organized by MVIT?"
    },
    {
      title: "Website Ease of Navigation",
      description: "How easy was it to navigate the Mitilence'25 website to find information?"
    },
    {
      title: "Website Clarity of Event Information",
      description: "How clear and detailed was the information provided about each event in the website?"
    },
    {
      title: "Website Pre-Registration Process",
      description: "How would you rate the ease of the pre-registration process through the website?"
    },
    {
      title: "Website Time Savings",
      description: "Did the web-based system save you time in accessing information and navigating to the event venues?"
    },
  ];

  const handleQuestionChange = (title: string, value: number | null) => {
    setFormData(prev => ({
      ...prev,
      [title]: value
    }));
  };

  const isQuestionAnswered = (questionTitle: string): boolean => {
    return formData[questionTitle] !== undefined && formData[questionTitle] !== null;
  };

  const scrollToFirstUnanswered = (missingFieldTitles: string[]) => {
    if (missingFieldTitles.length > 0) {
      const firstMissingField = document.querySelector(`[data-title="${missingFieldTitles[0]}"]`);
      if (firstMissingField) {
        firstMissingField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    const missingFields = questions
      .filter(q => !isQuestionAnswered(q.title))
      .map(q => q.title);
    
    setValidationAttempted(true);
    
    if (missingFields.length > 0) {
      // Scroll to the first unanswered question
      scrollToFirstUnanswered(missingFields);
      return;
    }
    
    // Add comments to form data
    const finalFormData = {
      ...formData,
      comments: feedbackText
    };
    
    if (fireUserData?.uid == null) return;

    // Log the form data to console
    console.log('Form Submission Data:', finalFormData);
    setFeedback(fireUserData?.uid, finalFormData)
    setFormClose()
    addToast({
      title: "Feedback Submitted",
      icon: <span>🤩</span>,
      description: "Thank you for your feedback! Your insights help us enhance future event experiences.",
      color: "danger",
      variant: 'bordered',
      classNames: {
        base: "bg-white",
        icon: "h-8 text-2xl",
        title: 'text-md font-semibold',
        description: 'font-medium whitespace-pre-wrap'
      }
    });
  };

  return (!(fireUserDoc == null && fireUserData != null)) &&
    <Modal
      size={"xl"}
      radius="lg"
      placement="bottom"
      scrollBehavior="outside"
      isOpen={formOpened}
      onClose={setFormClose}
    >
      <ModalContent>
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-sm shadow-white max-w-2xl mx-auto px-3 py-5 w-full"
        >
          <ModalBody>
            <h2 className="text-black text-2xl font-semibold mb-3">Last, Tell us how you really feel about Mitilence!</h2>
            <p className="text-gray-600 text-base mb-6">
              We'd love to hear about your experience! Please select the emoji that best reflects your mood at the event's conclusion. Your feedback will help us enhance next year's event and make it even better. Let's wrap up with a smile!
            </p>
            
            {questions.map((quest) => (
              <div key={quest.title} data-title={quest.title}>
                <EmojiQuestion 
                  question={quest}
                  onChange={handleQuestionChange}
                  error={validationAttempted && !isQuestionAnswered(quest.title)}
                />
              </div>
            ))}
                    
            <div>
              <div className="flex justify-between items-center gap-4 mb-2">
                <label className="text-gray-700 font-medium">Anything else you'd like to say?</label>
                <span className="text-gray-400 text-sm">(Optional)</span>
              </div>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-end gap-4">
            <Button
              type="submit"
              // isDisabled={disabled}
              className="px-6 bg-purple-600 text-white text-lg font-medium rounded-xl hover:bg-purple-700"
            >
              Submit feedback
            </Button>
          </ModalFooter>
        </form> 
      </ModalContent>
    </Modal>
};

export default FeedbackFormModal;