import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	DE_LONG,
	EN_LONG,
	ES_LONG,
	FR_LONG,
	IT_LONG,
	LocaleSpec,
	tense,
	units,
	unitsLessThan,
	withLocale,
} from "../src/index.js";

interface I18NTestSpec {
	year1: string;
	in_year1: string;
	year2: string;
	in_year2: string;
	in_less_year1: string;
	ago_less_year1: string;
	in_less_year2: string;
	ago_less_year2: string;
}

const check = (locale: LocaleSpec, spec: I18NTestSpec) => {
	withLocale(locale, () => {
		assert.strictEqual(units(1, "y"), spec.year1, "year1");
		assert.strictEqual(units(2, "y"), spec.year2, "year2");
		assert.strictEqual(
			tense(1, units(1, "y", true)),
			spec.in_year1,
			"in_year1"
		);
		assert.strictEqual(
			tense(1, units(2, "y", true)),
			spec.in_year2,
			"in_year2"
		);
		assert.strictEqual(
			tense(1, unitsLessThan(1, "y", true)),
			spec.in_less_year1,
			"in_less_year1"
		);
		assert.strictEqual(
			tense(1, unitsLessThan(2, "y", true)),
			spec.in_less_year2,
			"in_less_year2"
		);
		assert.strictEqual(
			tense(-1, unitsLessThan(1, "y", true)),
			spec.ago_less_year1,
			"ago_less_year1"
		);
		assert.strictEqual(
			tense(-1, unitsLessThan(2, "y", true)),
			spec.ago_less_year2,
			"ago_less_year2"
		);
	});
};

group("i18n", {
	DE_LONG: () => {
		check(DE_LONG, {
			year1: "1 Jahr",
			in_year1: "in 1 Jahr",
			year2: "2 Jahre",
			in_year2: "in 2 Jahren",
			in_less_year1: "in weniger als 1 Jahr",
			ago_less_year1: "vor weniger als 1 Jahr",
			in_less_year2: "in weniger als 2 Jahren",
			ago_less_year2: "vor weniger als 2 Jahren",
		});
	},

	EN_LONG: () => {
		check(EN_LONG, {
			year1: "1 year",
			in_year1: "in 1 year",
			year2: "2 years",
			in_year2: "in 2 years",
			in_less_year1: "in less than 1 year",
			ago_less_year1: "less than 1 year ago",
			in_less_year2: "in less than 2 years",
			ago_less_year2: "less than 2 years ago",
		});
	},

	ES_LONG: () => {
		check(ES_LONG, {
			year1: "1 año",
			in_year1: "en 1 año",
			year2: "2 años",
			in_year2: "en 2 años",
			in_less_year1: "en menos de 1 año",
			ago_less_year1: "hace menos de 1 año",
			in_less_year2: "en menos de 2 años",
			ago_less_year2: "hace menos de 2 años",
		});
	},

	FR_LONG: () => {
		check(FR_LONG, {
			year1: "1 année",
			in_year1: "dans 1 an",
			year2: "2 ans",
			in_year2: "dans 2 ans",
			in_less_year1: "dans moins de 1 an",
			ago_less_year1: "il y a moins de 1 an",
			in_less_year2: "dans moins de 2 ans",
			ago_less_year2: "il y a moins de 2 ans",
		});
	},

	IT_LONG: () => {
		check(IT_LONG, {
			year1: "1 anno",
			in_year1: "in 1 anno",
			year2: "2 anni",
			in_year2: "in 2 anni",
			in_less_year1: "in meno di 1 anno",
			ago_less_year1: "meno di 1 anno fa",
			in_less_year2: "in meno di 2 anni",
			ago_less_year2: "meno di 2 anni fa",
		});
	},
});
