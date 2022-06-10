const size = [4, 4, 4, 4, 4, 6, 6, 6, 6, 8, 8, 8, 10, 10, 12];
const vågadösize = [16, 20, 24];

const color = ["brun", "röd", "orange", "azur", "gul", "grön", "blå", "svart", "rosa", "färglös", "trombongul"];
const taste = ["smarrig", "god", "fruktig", "mjuk", "besk", "söt", "äcklig", "frisk", "tropisk", "apelsin",
              "banan", "kall", "varm", "stark", "tjock", "lakrits"];
const adjective = ["skön", "trevlig", "busig", "spännande", "dansk", "homogen", "apelsinig", "adekvat",
                  "frisk", "bussshaffis skön", "tigrig"];
const thing = ["finsk", "golvfest", "emulsion", "käftsmäll", "dansk", "fegis", "sommar",
              "kökkenmödding", "Finspångsmys", "finlandsfärja", "Amy Diamond", "Lasse Kronér",
              "manskörsrep", "fika", "flodhäst", "Bibbi", "tentatant", "tourmage"];
const skit = ["god", "trevlig", "nasty", "vatten", "smart", "juice", "bag"," på dig", "kall"];
const text = ["intendentens m/41", "Tillton stout", "bag", "Ågänget dirty fantasy no homo", "inget tjaffs", "fisk",
              "hondra procent", "swedish tequila", "BarenBaren bestämmer", "gin och tonic",
              "du har blivit barstoppad! Ställ dig sist i kön", "UNO reverse card", "va han från Polen?"];

const color_taste = color.length * taste.length;
const thing_adjective = adjective.length * thing.length;
const skit_drink = skit.length;
const test_drink = text.length;
const nobody_remeber = thing.length;
const one_thing = thing.length;
const våga_dö = vågadösize.length;

const total_comb = 5 * (color_taste + thing_adjective + skit_drink + test_drink + nobody_remeber + one_thing) + våga_dö;

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