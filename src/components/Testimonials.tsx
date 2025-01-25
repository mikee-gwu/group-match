import { useEffect, useState } from 'react'

const testimonials = [
  {
    name: 'Sarah L.',
    text: 'This app saved our movie night! We found a perfect match for our group in minutes.',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    name: 'Michael T.',
    text: 'The AI suggestions are spot on. We\'ve discovered so many great movies we wouldn\'t have found otherwise.',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    name: 'Emily R.',
    text: 'Finally, no more endless debates about what to watch. The quiz makes it so easy!',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    name: 'David K.',
    text: 'The group sync feature is brilliant. It really understands everyone\'s preferences.',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    name: 'Jessica M.',
    text: 'I love how quick and intuitive the quiz is. Great for last-minute movie decisions!',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
  },
  {
    name: 'Chris P.',
    text: 'The recommendations keep getting better the more we use it. Highly recommend!',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg'
  },
  {
    name: 'Olivia W.',
    text: 'Perfect for our family movie nights. Everyone gets a say in what we watch.',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg'
  },
  {
    name: 'Daniel S.',
    text: 'The AI matching is incredible. It found movies we all loved that we never would have picked.',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg'
  },
  {
    name: 'Sophia H.',
    text: 'Such a fun way to discover new movies. The interface is beautiful and easy to use.',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg'
  },
  {
    name: 'Matthew G.',
    text: 'This app has completely changed how we choose movies. No more decision fatigue!',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
  }
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const testimonial = testimonials[currentTestimonial]

  return (
    <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
      <div className="flex items-center gap-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{testimonial.name}</h3>
          <p className="text-sm text-gray-300">{testimonial.text}</p>
        </div>
      </div>
    </div>
  )
}
