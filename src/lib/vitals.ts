import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';

import type { Metric } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

type EffectiveConnectionType = '2g' | '3g' | '4g' | 'slow-2g';
declare interface Navigator {
	readonly connection?: {
		readonly effectiveType: EffectiveConnectionType;
	};
}

function getConnectionSpeed() {
	return (navigator as Navigator)?.connection?.effectiveType || '';
}

function sendToAnalytics(
	metric: Metric,
	options: {
		params: { [s: string]: string | RegExp } | ArrayLike<string | RegExp>;
		path: string;
		analyticsId: string;
		debug?: boolean;
	}
) {
	const page = Object.entries(options.params).reduce(
		(acc, [key, value]) => acc.replace(value, `[${key}]`),
		options.path
	);

	const body = {
		dsn: options.analyticsId,
		id: metric.id,
		page,
		href: location.href,
		event_name: metric.name,
		value: metric.value.toString(),
		speed: getConnectionSpeed()
	};

	if (options.debug) {
		console.log('[Analytics]', metric.name, JSON.stringify(body, null, 2));
	}

	const blob = new Blob([new URLSearchParams(body).toString()], {
		// This content type is necessary for `sendBeacon`
		type: 'application/x-www-form-urlencoded'
	});
	if (navigator.sendBeacon) {
		navigator.sendBeacon(vitalsUrl, blob);
	} else
		fetch(vitalsUrl, {
			body: blob,
			method: 'POST',
			credentials: 'omit',
			keepalive: true
		});
}

export function webVitals(options: {
	params: { [s: string]: string | RegExp } | ArrayLike<string | RegExp>;
	path: string;
	analyticsId: string;
	debug?: boolean;
}) {
	try {
		onFID((metric) => sendToAnalytics(metric, options));
		onTTFB((metric) => sendToAnalytics(metric, options));
		onLCP((metric) => sendToAnalytics(metric, options));
		onCLS((metric) => sendToAnalytics(metric, options));
		onFCP((metric) => sendToAnalytics(metric, options));
	} catch (err) {
		console.error('[Analytics]', err);
	}
}
