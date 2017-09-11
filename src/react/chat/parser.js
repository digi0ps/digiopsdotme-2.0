const LinkParser = (string) => {
  // The link matching regex
  const regex = /(https?:\/\/)?(\w+)\.(\w{2,4})\S+/g;
  const newstring = string.replace(regex, (link)=>`<a href=${link} target="blank" class="message-links">${link}</a>`);
  return newstring;
};

const Parser = (string) => {
  return LinkParser(string);
}
export default Parser;
