

const testimonials = [
  {
    id: 1,
    name: 'Bikfaya',
    message: 'Ingenieur Rita Wakim 0.....',
    comment: 'La branche de Metn Pour servir les taches de Metn',
  },
  {
    id: 2,
    name: 'Jounieh',
    message: 'Ingenieur Rima Mehanna 0.....',
    comment: 'La branche de Jounieh Pour servir les taches de Kesrwen',
  },
  {
    id: 3,
    name: 'Jbeil',
    message: 'Ingenieur Sahar Nader 0.....',
    comment: 'La branche de Jbeil Pour servir les taches de Jbeil',
  },
  {
    id: 4,
    name: 'Deir Kamar',
    message: 'Ingenieur hjkfhgf 0.....',
    comment: 'La branche de Jounieh Pour servir les taches de Montagne Chouf',
  },
  {
    id: 5,
    name: 'CHIM',
    message: 'Ingenieur gfgfg.....',
    comment: 'La branche de Jounieh Pour servir les taches de Cote Chouf',
  },
  {
    id: 6,
    name: 'Aley',
    message: 'Ingenieur Rabih El Ali.....',
    comment: 'La branche de Jounieh Pour servir les taches de Aley',
  },
  {
    id: 7,
    name: 'Hemmane',
    message: 'Ingenieur bfghgh Ali.....',
    comment: 'La branche de Jounieh Pour servir les taches de Hemana',
  },
];

const About = () => {
  return (

    <div className="testimonial-container" id = "testimonials"> 
      {testimonials.map((testimonial, index) => (
  <div className={`flip-card ${index === testimonials.length - 1 ? 'last-card' : ''}`} key={testimonial.id}>

          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h2>{testimonial.name}</h2>
              <p className="quote-icon">❝</p>
              <p className="message">{testimonial.message}</p>
            </div>
            <div className="flip-card-back">
              <p>{testimonial.comment}</p>
            </div>
          </div>
        </div>
      ))}

    </div>

  );
}

export default About;
