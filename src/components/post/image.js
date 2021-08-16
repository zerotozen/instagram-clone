import PropTypes from "prop-types";

export default function Image({ src, caption }) {
  return (
    <img className="h-photo w-full object-cover" src={src} alt={caption} />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
