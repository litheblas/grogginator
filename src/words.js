const size = [4, 4, 4, 4, 4, 6, 6, 6, 6, 8, 8, 8, 10, 10, 12];
const vågadösize = [16, 20, 24];

const color = ["röd", "gul", "grön", "blå", "svart", "rosa", "färglös"];
const taste = ["god", "fruktig", "mjuk", "besk", "söt", "äcklig", "frisk", "tropisk", "apelsin", "banan"];
const adjective = ["skön", "trevlig", "busig", "spännande", "dansk", "heterogen", "homogen", "apelsinig", "split"];
const thing = ["golvfest", "emulsion", "käftsmäll", "dansk", "fegis", "sommar", "kökkenmödding"];
const skit = ["god", "äcklig", "nasty", "vatten", "trevlig", "juice", " på dig"];
const text = ["inget tjaffs", "fisk", "hondra prrocent", "swedish tequila",
  "baren bestämmer", "gin och tonic", "du har blivit barstoppad! Ställ dig sist i kön"];

const color_taste = color.length * taste.length;
const thing_adjective = adjective.length * thing.length;
const skit_drink = skit.length;
const test_drink = text.length;
const nobody_remeber = thing.length;
const one_thing = thing.length;
const våga_dö = vågadösize.length;

const total_comb = 5 * (color_taste + thing_adjective + skit_drink + test_drink + nobody_remeber + one_thing) + 3 * våga_dö;

export const constClass = {
  size: size,
  vågadösize: vågadösize,
  color: color,
  taste: taste,
  adjective: adjective,
  thing: thing,
  skit: skit,
  text: text,
  total_comb: total_comb
}