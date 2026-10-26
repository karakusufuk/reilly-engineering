/* Reilly Engineering — all site data in one place. */
window.RE = {
  phone: "01 234 5316",
  servicePhone: "01 234 5317",
  address: "Unit 7, Ardcullen Business Park, Swords, Co. Dublin, K67 C4V2",
  emails: { sales: "sales@reilly.ufuk.ie", service: "service@reilly.ufuk.ie", parts: "parts@reilly.ufuk.ie" },

  machines: [
    {
      slug: "aldner-vx-850", why: "Why these parts: flat-faced blocks and plates, milled, bored and pocketed on three axes.", sectors: ["Hydraulics", "Automotive", "Mould-making", "General engineering"], brand: "Aldner", model: "VX-850", group: "Milling", type: "3-axis milling centre",
      img: "aldner-vx-850.jpg", price: "€96,000", key: ["3 axes", "850 × 500 × 510 mm", "±3 µm"],
      intro: "The machine most shops start with. A rigid, honest vertical mill for housings, plates and brackets, with room to grow into a fourth axis or robot loading later.",
      specs: [["Travel X / Y / Z", "850 × 500 × 510 mm"], ["Table", "1,000 × 500 mm, 500 kg"], ["Spindle", "12,000 rpm, 18.5 kW, BT40"], ["Tools", "24"], ["Rapid traverse", "36 m/min"], ["Accuracy", "±3 µm"], ["Control", "Aldner Pilot"], ["Footprint", "2.4 × 2.3 m"], ["Weight", "5,200 kg"]],
      parts: [["Pump housing", "part-pump-housing.jpg", "prismatic"], ["Mould plate", "part-mould-plate.jpg", "prismatic"], ["Bracket", "part-bracket.jpg", "prismatic"]],
      options: [["4th-axis rotary table", "Machine round and angled features in one setup.", "+ €14,500"], ["Through-spindle coolant, 20 bar", "Clears chips from deep holes and pockets.", "+ €6,800"], ["Tool and part probing", "Sets tools and finds the part without a dial.", "+ €9,200"], ["Reilly Cell robot loading", "Eight hours of unattended running, loaded by robot.", "+ €68,000"]],
      software: [0, 2, 3],
      cheaper: [["A rebuilt 2019 VX-850", "From our used list, laser-checked, 12-month warranty.", "€54,000", 0]],
      spares: [["Spindle cartridge 12k", "RE-31245", "Exchange", "€8,900"], ["X-axis ball screw", "RE-28760", "In stock, Swords", "€2,350"], ["Telescopic way cover set", "RE-19022", "2–3 days", "€1,480"], ["Coolant pump 1.1 kW", "RE-55310", "In stock, Swords", "€640"]],
      planFrom: [1450, 3200, 6900]
    },
    {
      slug: "aldner-rx-5", why: "Why these parts: freeform shapes, where five axes reach every face in one clamping.", sectors: ["Medical", "Aerospace", "Mould-making"], brand: "Aldner", model: "RX-5", group: "Milling", type: "5-axis milling centre",
      img: "aldner-rx-5.jpg", price: "€310,000", key: ["5 axes", "650 × 520 × 475 mm", "±2 µm"],
      intro: "Five axes on a tilting trunnion for the parts that cannot be clamped twice: hip stems, turbine blades and deep mould cores, finished in one setup.",
      specs: [["Travel X / Y / Z", "650 × 520 × 475 mm"], ["Rotary axes", "B ±120°, C 360°"], ["Table", "Ø 500 mm, 250 kg"], ["Spindle", "20,000 rpm, 25 kW, HSK-A63"], ["Tools", "60"], ["Rapid traverse", "50 m/min"], ["Accuracy", "±2 µm"], ["Control", "Aldner Pilot 5X"], ["Footprint", "3.1 × 3.4 m"], ["Weight", "9,800 kg"]],
      parts: [["Hip stem", "part-hip-stem.jpg", "3d-surfaces"], ["Turbine blade", "part-turbine-blade.jpg", "3d-surfaces"], ["Mould insert", "part-mould-insert.jpg", "3d-surfaces"]],
      options: [["2-pallet changer", "Load the next part while this one cuts.", "+ €38,000"], ["120-tool magazine", "Run a whole family of parts without changing tools.", "+ €29,000"], ["Tool and part probing", "Sets tools and finds the part without a dial.", "+ €9,200"], ["Reilly Cell robot loading", "Eight hours of unattended running, loaded by robot.", "+ €72,000"]],
      software: [0, 1, 2, 3],
      cheaper: [["VX-850 with a 4th-axis table", "For 3+1 work where full 5-axis motion is not needed.", "€110,500", null], ["A rebuilt 2020 RX-5", "One owner, full service history.", "€198,000", 2]],
      spares: [["Spindle cartridge 20k HSK", "RE-31262", "Exchange", "€14,600"], ["Trunnion rotary seal kit", "RE-44108", "In stock, Swords", "€390"], ["B-axis encoder", "RE-60217", "2–3 days", "€1,950"], ["Tool magazine gripper set", "RE-27731", "In stock, Swords", "€520"]],
      planFrom: [2400, 4900, 9800]
    },
    {
      slug: "hoshida-tl-42", why: "Why these parts: round work, where shafts, flanges and fittings are turned on one centre line.", sectors: ["Hydraulics", "Automotive", "Energy"], brand: "Hoshida", model: "TL-42", group: "Turning", type: "CNC lathe",
      img: "hoshida-tl-42.jpg", price: "€118,000", key: ["Ø 420 mm swing", "4,500 rpm", "±3 µm"],
      intro: "A slant-bed lathe built for shafts, flanges and fittings, day after day. Add a Y-axis and live tools and it mills the flats and cross holes too.",
      specs: [["Swing", "Ø 420 mm"], ["Max turning", "Ø 350 × 600 mm"], ["Chuck", "10 inch"], ["Bar capacity", "Ø 65 mm"], ["Spindle", "4,500 rpm, 22 kW"], ["Turret", "12 stations"], ["Accuracy", "±3 µm"], ["Control", "Hoshida HX"], ["Footprint", "3.2 × 1.9 m"], ["Weight", "5,600 kg"]],
      parts: [["Hydraulic fitting", "part-hydraulic-fitting.jpg", "shafts-round"], ["Drive shaft", "part-drive-shaft.jpg", "shafts-round"], ["Flange", "part-flange.jpg", "shafts-round"]],
      options: [["Y-axis with live tooling", "Mill flats, slots and cross holes without a second machine.", "+ €24,000"], ["3 m bar feeder", "Feed bar stock and run small parts unattended.", "+ €17,500"], ["Parts catcher", "Finished parts land in a tray, not in the chips.", "+ €3,900"], ["Programmable tailstock", "Support long shafts without setting by hand.", "+ €6,200"]],
      software: [0, 2, 3],
      cheaper: [["A rebuilt 2017 TL-42", "New turret seals, ballbar report.", "€48,500", 1]],
      spares: [["Chuck jaw set 10 inch", "RE-12044", "In stock, Swords", "€410"], ["Turret clamp seal kit", "RE-44051", "In stock, Swords", "€280"], ["Z-axis ball screw", "RE-28790", "2–3 days", "€2,100"], ["Main spindle belt", "RE-17703", "In stock, Swords", "€180"]],
      planFrom: [1450, 3200, 6900]
    },
    {
      slug: "hoshida-sw-20", why: "Why these parts: small, slender bar work, held right at the cut so it stays straight.", sectors: ["Medical", "Dental", "Electronics"], brand: "Hoshida", model: "SW-20", group: "Turning", type: "Swiss-type lathe",
      img: "hoshida-sw-20.jpg", price: "€265,000", key: ["Ø 20 mm bar", "10,000 rpm", "±1 µm"],
      intro: "The machine behind most bone screws and dental implants. The bar slides through a guide bushing, so long slender parts are cut right next to the support and stay true to a micron.",
      specs: [["Bar capacity", "Ø 20 mm"], ["Headstock stroke", "205 mm"], ["Main and sub spindle", "10,000 rpm"], ["Tools", "33 (12 driven)"], ["Accuracy", "±1 µm"], ["Bar feeder", "3.2 m, included"], ["Control", "Hoshida HX"], ["Footprint", "2.3 × 1.3 m plus feeder"], ["Weight", "2,900 kg"]],
      parts: [["Bone screw", "part-bone-screw.jpg", "small-turned"], ["Dental implant", "imp-implant-body.png", "small-turned"], ["Connector pin", "part-connector-pin.jpg", "small-turned"]],
      options: [["Guide-bushingless kit", "Run short parts from cheaper unground bar.", "+ €8,400"], ["70 bar high-pressure coolant", "Breaks chips on titanium and stainless.", "+ €11,000"], ["Back-working tool block", "Finish the second end on the sub spindle.", "+ €7,600"], ["Oil mist extractor", "Keeps the shop air clean on long runs.", "+ €4,300"]],
      software: [0, 2, 3],
      cheaper: [["TL-42 with a bar feeder", "For turned parts above Ø 20 mm, where a Swiss machine is more than you need.", "€135,500", null], ["A rebuilt 2018 SW-20", "Guide bushing renewed, bar feeder included.", "€132,000", 3]],
      spares: [["Guide bushing Ø 20", "RE-77105", "In stock, Swords", "€620"], ["Collet set, main spindle", "RE-77142", "In stock, Swords", "€290"], ["Bar feeder pusher", "RE-77310", "2–3 days", "€340"], ["Sub-spindle encoder", "RE-60255", "2–3 days", "€1,780"]],
      planFrom: [1900, 4100, 8200]
    },
    {
      slug: "aldner-mt-400", why: "Why these parts: each one needs turning and milling, round bodies with milled ports, teeth or flats, finished in one setup.", sectors: ["Hydraulics", "Automotive", "Medical", "Aerospace"], brand: "Aldner", model: "MT-400", group: "Special", type: "Mill-turn centre",
      img: "aldner-mt-400.jpg", price: "€420,000", key: ["Ø 400 × 1,000 mm", "12,000 rpm", "±2 µm"],
      intro: "Two spindles and a milling head on a B-axis, so a part goes in as bar and comes out finished on every face. One machine, one setup, one operator.",
      specs: [["Max turning", "Ø 400 × 1,000 mm"], ["Main and sub spindle", "4,000 rpm"], ["Milling spindle", "B-axis, 12,000 rpm, 22 kW, HSK-A63"], ["Tools", "80"], ["Accuracy", "±2 µm"], ["Control", "Aldner Pilot MT"], ["Footprint", "4.6 × 2.8 m"], ["Weight", "14,500 kg"]],
      parts: [["Valve body", "part-valve-body.jpg", "mill-turn"], ["Gear shaft", "part-gear-shaft.jpg", "mill-turn"], ["Spinal rod", "part-spinal-rod.jpg", "mill-turn"]],
      options: [["Second lower turret", "Cut with two tools at once on long parts.", "+ €46,000"], ["Programmable steady rest", "Supports long shafts during heavy cuts.", "+ €12,500"], ["Gantry loader", "Loads blanks and unloads finished parts overnight.", "+ €58,000"], ["Tool length measuring", "Checks every tool before it touches the part.", "+ €5,900"]],
      software: [0, 1, 2, 3],
      cheaper: [["TL-42 with Y-axis plus a VX-850", "Two machines and two setups for a lower entry price.", "€238,000", null]],
      spares: [["B-axis milling head bearing kit", "RE-31390", "Exchange", "€6,400"], ["Steady rest jaw set", "RE-12088", "In stock, Swords", "€560"], ["Y-axis servo motor", "RE-60301", "2–3 days", "€2,850"], ["Chip conveyor belt", "RE-19140", "2–3 days", "€1,120"]],
      planFrom: [2900, 5800, 11400]
    },
    {
      slug: "hoshida-ew-60", why: "Why these parts: hardened steel with sharp inside corners, cut by wire spark after heat treatment.", sectors: ["Tool and die", "Automotive", "Electronics"], brand: "Hoshida", model: "EW-60", group: "Special", type: "Wire EDM",
      img: "hoshida-ew-60.jpg", price: "€178,000", key: ["600 × 400 × 350 mm", "Ø 0.1–0.3 mm wire", "±1.5 µm"],
      intro: "A thin brass wire and a spark, cutting hardened steel no cutter can touch. For punch dies, extrusion dies and fine gears with sharp inside corners.",
      specs: [["Travel X / Y / Z", "600 × 400 × 350 mm"], ["U / V", "80 mm"], ["Max workpiece", "1,050 × 750 × 345 mm, 800 kg"], ["Wire", "Ø 0.1–0.3 mm"], ["Taper", "±30° over 80 mm"], ["Surface finish", "Ra 0.12 µm"], ["Accuracy", "±1.5 µm"], ["Control", "Hoshida HX-E"], ["Footprint", "2.9 × 2.7 m"], ["Weight", "3,900 kg"]],
      parts: [["Punch die", "part-punch-die.jpg", "dies-profiles"], ["Extrusion die", "part-extrusion-die.jpg", "dies-profiles"], ["Fine gear", "part-fine-gear.jpg", "dies-profiles"]],
      options: [["Rotary index axis", "Cut features around a round part.", "+ €9,800"], ["Fine-finish generator", "Mirror surfaces straight off the machine.", "+ €15,000"], ["Wire chopper", "Cuts used wire into a bin, not a tangle.", "+ €3,600"], ["Remote monitoring", "A text when the wire breaks or the job ends.", "+ €2,400"]],
      software: [0, 2, 3],
      cheaper: [["A rebuilt 2016 EW-60", "New generator board and filters.", "€71,000", 4]],
      spares: [["Upper wire guide Ø 0.25", "RE-88011", "In stock, Swords", "€95"], ["Filter cartridges, pair", "RE-88054", "In stock, Swords", "€210"], ["Power feed contact", "RE-88023", "In stock, Swords", "€48"], ["Ion-exchange resin, 10 l", "RE-88070", "In stock, Swords", "€260"]],
      planFrom: [1450, 3200, 6900]
    }
  ],

  software: [
    ["Shopfloor programming", "Write simple jobs at the machine, without CAM.", "€2,900"],
    ["Smooth 5-axis motion", "Better surfaces on freeform parts.", "€4,800"],
    ["Machine monitoring", "Spindle hours, alarms and utilisation on one screen.", "€1,200 / year"],
    ["CAM post-processor", "A tested post for your CAM system and this machine.", "€1,650"]
  ],

  plans: [
    ["Essential", "One visit a year. Geometry and accuracy check, safety check, written report."],
    ["Production", "Two visits a year. Priority 8-hour response. 10% off parts."],
    ["Uptime", "Four visits a year. 4-hour response. An exchange spindle held for you."]
  ],

  used: [
    { m: "aldner-vx-850", name: "Aldner VX-850", year: 2019, hours: "11,400 spindle hours", note: "Rebuilt spindle, new way covers, laser-checked.", price: "€54,000", img: "col-second-hand.jpg" },
    { m: "hoshida-tl-42", name: "Hoshida TL-42", year: 2017, hours: "18,900 spindle hours", note: "New turret seals, ballbar report.", price: "€48,500" },
    { m: "aldner-rx-5", name: "Aldner RX-5", year: 2020, hours: "9,200 spindle hours", note: "One owner, full service history.", price: "€198,000" },
    { m: "hoshida-sw-20", name: "Hoshida SW-20", year: 2018, hours: "22,100 spindle hours", note: "Guide bushing renewed, bar feeder included.", price: "€132,000" },
    { m: "hoshida-ew-60", name: "Hoshida EW-60", year: 2016, hours: "16,000 hours", note: "New generator board, filters.", price: "€71,000" }
  ],

  families: [
    { slug: "small-turned", name: "Small precision turned parts", hero: "part-bone-screw.jpg", size: "Ø 1–20 mm", tol: "±1 µm", mat: "Ti, 316L, PEEK, brass", made: ["hoshida-sw-20", "aldner-mt-400"],
      text: "Long, slender and small: screws, pins and implants that bend away from the tool if you cut them on an ordinary lathe. A Swiss-type machine holds the bar right next to the cut, so a 60 mm bone screw stays straight to a micron.",
      parts: [["Bone screw", "part-bone-screw.jpg", "Medical"], ["Dental implant", "imp-implant-body.png", "Medical"], ["Connector pin", "part-connector-pin.jpg", "Electronics"]] },
    { slug: "3d-surfaces", name: "Complex 3D surfaces", hero: "part-turbine-blade.jpg", size: "up to 600 mm", tol: "±2 µm", mat: "Ti, Inconel, tool steel", made: ["aldner-rx-5"],
      text: "Freeform shapes that curve in every direction. Clamp them twice and the second setup never lines up with the first. Five axes reach every face in one go, and the surface needs no hand polishing.",
      parts: [["Hip stem", "part-hip-stem.jpg", "Medical"], ["Turbine blade", "part-turbine-blade.jpg", "Aerospace"], ["Mould insert", "part-mould-insert.jpg", "Mould-making"]] },
    { slug: "prismatic", name: "Prismatic housings", hero: "part-pump-housing.jpg", size: "up to 850 mm", tol: "±3 µm", mat: "Al, steel, cast iron", made: ["aldner-vx-850", "aldner-rx-5"],
      text: "Blocks, plates and brackets: flat faces, bored holes and pockets. The everyday work of a machine shop, where rigidity and quick tool changes matter more than fancy motion.",
      parts: [["Pump housing", "part-pump-housing.jpg", "Hydraulics"], ["Mould plate", "part-mould-plate.jpg", "Mould-making"], ["Bracket", "part-bracket.jpg", "Automotive"]] },
    { slug: "shafts-round", name: "Shafts and round parts", hero: "part-drive-shaft.jpg", size: "Ø 10–420 mm", tol: "±3 µm", mat: "Steel, stainless, brass", made: ["hoshida-tl-42", "aldner-mt-400"],
      text: "Anything that spins or seals: shafts, flanges and fittings. Concentricity is the whole job, and a rigid slant-bed lathe keeps every diameter on the same centre.",
      parts: [["Drive shaft", "part-drive-shaft.jpg", "Automotive"], ["Flange", "part-flange.jpg", "Hydraulics"], ["Hydraulic fitting", "part-hydraulic-fitting.jpg", "Hydraulics"]] },
    { slug: "mill-turn", name: "Turned and milled in one setup", hero: "part-valve-body.jpg", size: "Ø up to 400 mm", tol: "±2 µm", mat: "Steel, Ti, Al", made: ["aldner-mt-400"],
      text: "Round parts with milled faces, ports and teeth. Moving them from a lathe to a mill costs time and accuracy; a mill-turn centre finishes every face before the part comes out.",
      parts: [["Valve body", "part-valve-body.jpg", "Hydraulics"], ["Gear shaft", "part-gear-shaft.jpg", "Automotive"], ["Spinal rod", "part-spinal-rod.jpg", "Medical"]] },
    { slug: "dies-profiles", name: "Hardened profiles and dies", hero: "part-punch-die.jpg", size: "up to 600 mm", tol: "±1.5 µm", mat: "Tool steel, carbide", made: ["hoshida-ew-60"],
      text: "Hardened steel with sharp inside corners that no rotating cutter can make. Wire EDM cuts the profile with a spark, after heat treatment, so nothing moves afterwards.",
      parts: [["Punch die", "part-punch-die.jpg", "Automotive"], ["Extrusion die", "part-extrusion-die.jpg", "Aluminium extrusion"], ["Fine gear", "part-fine-gear.jpg", "Electronics"]] }
  ]
};
RE.bySlug = function (s) { return RE.machines.filter(function (m) { return m.slug === s; })[0]; };
RE.family = function (s) { return RE.families.filter(function (f) { return f.slug === s; })[0]; };
