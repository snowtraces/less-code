let config = {
    scope: {
        SERVICE: 'service',
        RESOURCE: 'criticalvalue',
    },
    base_package: 'com.winning.execution.mdm',
    annotation: `/**
 *
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */`
}

{
    let keys = Object.keys(config)
    keys.forEach(key => {
        window[key] = config[key]
    });
}